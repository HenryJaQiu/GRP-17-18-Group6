// The code in this file has been mainly written by Cong LIU with considerable
// support from KaiWen ZHANG
import store from '../../vuex/store'
const math = require('mathjs')
// The bootstrap particles filter algorithm class is prepared for the implementation in vue component.
class Algorithm {
  constructor (m, p0, q, r) {
    this.m = m
    this.p0 = p0
    this.q = q
    this.r = r
  }

  // start() function will invoke the particle filter
  start () {
    return testPF(this.m, this.p0, this.q, this.r)
  }
}

// randn() will generate the random number from normal distribution
function randn (sz1, sz2) {
  var mat = math.zeros(sz1, sz2)
  for (var i = 0; i < sz1; i++) {
    for (var j = 0; j < sz2; j++) {
      var u1 = Math.random()
      var u2 = Math.random()
      // Box-Muller transform
      var angle = 2 * Math.PI * u2
      var r = Math.sqrt((-2) * Math.log(u1))
      var z0 = r * Math.cos(angle)
      // var z1 = r * Math.sin(angle);
      mat.subset(math.index(i, j), z0)
    }
  }
  return mat
}

// size() return the size of referred dimension.
function size (x, dim) {
  var m = math.size(x)
  return m.subset(math.index(dim))
}

// returns an array containing n copies of A in the row and column dimensions
function repmat (mat, num1, num2) {
  var temp = mat
  if (num1 === 1) {
    var temp1 = mat
  } else {
    // Here, generate n copies of A in the row dimension
    for (let i = 0; i < num1 - 1; i++) {
      temp1 = math.concat(temp, mat, 0)
    }
  }
  var temp2 = temp1
  if (num2 === 1) {
    return mat
  } else {
    // Here, generate n copies of A in the column dimension
    for (let j = 0; j < num2 - 1; j++) {
      temp2 = math.concat(temp2, temp1, 1)
    }
  }
  return temp2
}

// returns the cumulative sum of A
// if A is a vector, then cumsum(A) returns a vector
// if A is a matrix, then cumsum(A) returns a matrix
function cumsum (q) {
  var size = math.size(q)
  var row = math.subset(size, math.index(0))
  var col = math.subset(size, math.index(1))

  if (row === 1) {
    var mat = math.zeros(1, size.subset(math.index(1)))
    for (let i = 0; i < col; i++) {
      if (i === 0) {
        var addition = math.subset(q, math.index(0, 0)) + 0
        mat.subset(math.index(0, 0), addition)
      } else {
        addition = math.subset(q, math.index(0, (i - 1))) + math.subset(q, math.index(0, i))
        mat.subset(math.index(0, i), addition)
      }
    }
    return mat
  } else {
    return 0
  }
}

// returns the size of the longest dimension of X
function length (matrix) {
  var m = math.size(matrix)
  var row = m.subset(math.index(0))
  var col = m.subset(math.index(1))
  return (Math.max(row, col))
}

// The likelihood function
// It is used to calculate the particle weight in PF
function pe (x, R) {
  var m = math.size(x)
  var col = m.subset(math.index(1))
  var output = math.zeros(1, col)
  for (let i = 0; i < col; i++) {
    var tem = ((1 / math.pow((2 * math.pi * R), 1 / 2)) * (math.exp(-(math.pow(x.subset(math.index(0, i)), 2)) / (2 * R))))
    output.subset(math.index(0, i), tem)
  }
  return output
}

// The model equation
function f (x, t) {
  var m = math.size(x)
  var col = m.subset(math.index(1))
  var output = math.zeros(1, col)
  for (let i = 0; i < col; i++) {
    var tem = math.divide(x.subset(math.index(0, i)), 2) + math.multiply(25, math.divide(x.subset(math.index(0, i)), math.add(1, math.pow(x.subset(math.index(0, i)), 2)))) + math.multiply(8, math.cos((1.2) * t))
    output.subset(math.index(0, i), tem)
  }
  return output
}

// The model equation
function h (x) {
  var m = math.size(x)
  var col = m.subset(math.index(1))
  var output = math.zeros(1, col)
  for (let i = 0; i < col; i++) {
    var tem = math.pow(x.subset(math.index(0, i)), 2) / 20
    output.subset(math.index(0, i), tem)
  }
  return output
}

// returns the matrix after element-wise Addition of two matries(vectors)
function dotAdd (x, y) {
  var my = math.size(y)
  var mx = math.size(x)
  var ycol = my.subset(math.index(1))
  var xcol = mx.subset(math.index(1))
  if (xcol === 1) {
    for (let i = 0; i < ycol; i++) {
      var tem = math.add(x.subset(math.index(0, 0)), y.subset(math.index(0, i)))
      y.subset(math.index(0, i), tem)
    }
  } else {
    for (let i = 0; i < ycol; i++) {
      tem = math.add(x.subset(math.index(0, i)), y.subset(math.index(0, i)))
      y.subset(math.index(0, i), tem)
    }
  }
  return y
}

// returns the matrix after element-wise Subtraction of two matries(vectors)
function dotSubtract (x, y) {
  var mx = math.size(x)
  var xcol = mx.subset(math.index(1))
  var output = math.zeros(1, xcol)
  for (let i = 0; i < xcol; i++) {
    var tem = math.subtract(x.subset(math.index(0, i)), y.subset(math.index(0, i)))
    output.subset(math.index(0, i), tem)
  }
  return output
}
//
// function multiply(x,y)
// {
//   var m = math.size(x);
//   var col = m.subset(math.index(1));
//   var output = math.zeros(1,col);
//   for(i=0; i<col; i++){
//     var tem = math.multiply(x.subset(math.index(0,i)), y.subset(math.index(0,i)));
//     output.subset(math.index(0,i), tem);
//   }
//   return output;
// }

// return the matrix with selected element indicated by ind
function forx (x, ind) {
  var mx = math.size(x)
  // var mind = math.size(ind)
  var xcol = mx.subset(math.index(1))
  for (let i = 0; i < xcol; i++) {
    var tem1 = ind.subset(math.index(0, i))
    var tem2 = x.subset(math.index(0, tem1))
    x.subset(math.index(0, i), tem2)
  }
  return x
}

// resampling is the implementation of systematic resampling
function resampling (q) {
  var qc = cumsum(q)
  var M = length(q)
  var u = math.dotDivide(dotAdd(math.matrix([[math.random(1)]]), math.matrix([math.range(0, M)])), M)
  var i = math.zeros(1, M)
  var k = 0
  for (let j = 0; j < M; j++) {
    while ((k < M - 1) && (qc.subset(math.index(0, k)) < u.subset(math.index(0, j)))) {
      k = k + 1
    }
    i.subset(math.index(0, j), k)
  }
  return i
}

// The core function of implementation of particle filter
function xhatPF (Q, P0, M, y) {
  var n = size(math.matrix([[P0]]), 1)
  var x = math.dotMultiply(math.sqrt(P0), randn(n, M))
  var xhat = math.zeros(1, 100)
  var q = null
  // simulate the states 100 times
  for (let t = 0; t < 100; t++) {
    var e = dotSubtract(repmat(math.matrix([[y.subset(math.index(0, t))]]), 1, M), h(x))
    q = pe(e, 1)
    q = math.divide(q, math.sum(q))
    xhat.subset(math.index(0, t), math.sum(math.dotMultiply(repmat(q, n, 1), x)))
    var ind = resampling(q)
    x = forx(x, ind)
    x = dotAdd(f(x, t), math.dotMultiply(math.sqrt(Q), randn(n, M)))
  }
  return xhat
}

// function for testing particle filter
function testPF (p, inc, pnc, mnc) {
  var M = parseInt(p) // Number of particles
  var P0 = inc // Initial noise covariance
  var Q = pnc // Process noise covariance
  var R = mnc // Measurement noise covariance
  var x = math.zeros(1, 100)
  var y = math.zeros(1, 100)
  x.subset(math.index(0, 0), math.multiply(math.sqrt(P0), randn(1, 1).subset(math.index(0, 0))))
  y.subset(math.index(0, 0), (h(math.matrix([[x.subset(math.index(0, 0))]])).subset(math.index(0, 0)) + math.sqrt(R) + randn(1, 1).subset(math.index(0, 0))))

  for (let t = 1; t < 100; t++) {
    x.subset(math.index(0, t), (f(math.matrix([[x.subset(math.index(0, t - 1))]]), (t - 1)).subset(math.index(0, 0)) + math.multiply(math.sqrt(Q), randn(1, 1).subset(math.index(0, 0)))))
    y.subset(math.index(0, t), (h(math.matrix([[x.subset(math.index(0, t))]])).subset(math.index(0, 0)) + math.multiply(math.sqrt(R), randn(1, 1).subset(math.index(0, 0)))))
  }

  store.commit('setMatrixTrue', x)
  var xhat = xhatPF(Q, P0, M, y)

  return xhat
}

export default Algorithm
