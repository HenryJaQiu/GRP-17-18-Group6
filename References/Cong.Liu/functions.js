function randn(sz1, sz2){
    var mat = math.zeros(sz1, sz2);
    for(var i = 0;i < sz1;i++){
        for(var j = 0;j < sz2;j++){
            var u1 = Math.random();
            var u2 = Math.random();
            var angle = 2 * Math.PI * u2;
            var r = Math.sqrt((-2) * Math.log(u1));
            var z0 = r * Math.cos(angle);
            //var z1 = r * Math.sin(angle);
            mat.subset(math.index(i,j), z0);
        }
    }
    return mat;
}

size(x, dim){
  var m = math.size(x);
  return m.subset(math.index(dim));
}

function repmat(mat, num1, num2)
{
    var temp = mat;
    var size = math.size(mat);
    var row = size.subset(math.index(0));
    var col = size.subset(math.index(1));
    var output = math.zeros(row * num1, col * num2);
    for(i=0; i<num1-1; i++){
      var temp1 = math.concat(temp,mat,0);
    }
      var temp2 = temp1;
    for(j=0; j<num2-1; j++){
      temp2 = math.concat(temp2,temp1,1);
    }
    return temp2;
}

function cumsum(q)
{
  var size = math.size(q);
  var row = math.subset(size, math.index(0));

  if(row == 1){
    var mat = math.zeros(1, size.subset(math.index(1)));
    for(i=0; i<math.subset(size, math.index(1)); i++){
      if(i==0){
        var addition = math.subset(q, math.index(0,0)) + 0;
        mat.subset(math.index(0,0), addition);
      }else{
        var addition = math.subset(q, math.index(0,(i-1))) + math.subset(q, math.index(0,i));
        mat.subset(math.index(0,i), addition);
      }
    }
    return mat;
  }
  else{
    return 0;
  }
}

function length(matrix){
    var m = math.size(matrix);
    var row = m.subset(math.index(0));
    var col = m.subset(math.index(1));
    return (Math.max(row,col));
}
