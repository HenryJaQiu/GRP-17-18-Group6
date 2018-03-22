#! usr/bin/env python3
import numpy as np
import scipy.linalg as sl
"""
p0 = np.matrix('1,1,1; 2,3,4')
n = np.size(p0,1)

p1 = np.array([1,2,3])
print(p1)
p1 = p1 + p1
#print(p0)
#print(n)
p rint(p1 )
"""


def cumsum(A):
    c = A.shape
    dim = c[0]
    if dim > 1:
        return np.cumsum(A, 0)
    else:
        return np.cumsum(A)

def sum(A):
    c = A.shape
    dim = c[0]
    if dim > 1:
        return np.sum(A, 0)
    else:
        return np.sum(A)


def resampling(q):
    qc = cumsum(q)
    M = np.max(q.shape)
    u = (np.arange(0, M-1) + np.random.uniform(0, 1, 1))/M
    i = np.zeros((1, M))
    k = 1
    for j in M :
        while (qc[k] < u[j]) :
            k = k + 1
        i[j] = k
    return i

def PF(f,h,pe,Q,P0,M,y):

    n = np.size(P0,1)
    x = sl.sqrtm(P0)*np.random.randn(n,M)
    for t in range(1,101):
        e = np.kron(np.ones((1,M)), y[t]) - h(x)
        q = pe(e)
        q = q/sum(q)
        xhat[t] = np.sum(np.multiply(np.kron(np.ones((n,1)),q), x), 1)
        ind = resampling(q)
        x = x[:,ind]
        x = f(x,t) + sl.sqrtm(Q)*np.random.randn(n,M)
    return xhat


def TestPF():
    M = 1000
    P0 = np.array([[5]])
    Q = 10
    R = np.array([[1]])
    pe = lambda x : ((1/((2*np.pi*R)**(1/2)))*np.exp(-(x**2)/(2*R)))
    f = lambda x,t : ((x**2) + (25*x)/(1+x**2) + 8*np.cos(1.2*t))
    h = lambda x : ((x**2)/20)
    x = 
    y =
    x[1] = sl.sqrtm(P0)*np.random.randn(1)
    y[1] = h(x[1]) + sl.sqrtm(R)*np.random.randn(1)

    for t in range(2,101):
        x[t] = f(x[t-1], (t-1))
        y[t] = h(x[t]) + sl.sqrtm(R)*np.random.randn(1)

    xTrue = x
    xhat = PF(f,h,pe,Q,P0,M,y)
    return x


TestPF()
'''
b = np.array([[1,16],[256,81]])
print(b)
a = np.array([5])
x = np.sqrtm(a)
print(x)
'''
