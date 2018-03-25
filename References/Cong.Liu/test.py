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
'''
def feval(funt,var):
    for i in var:
'''


def resampling(q):
    qc = cumsum(q)
    M = np.max(q.shape)
    u = (np.arange(0, M) + np.random.uniform(0, 1, 1))/M
    i = np.zeros((1, M))
    k = 0
    for j in range(0,M):
        while (qc[0][k] < u[0][j]) :
            k = k + 1
        i[0][j] = k
    return i


def PF(f,h,pe,Q,P0,M,y):

    n = np.size(P0,1)
    x = np.sqrt(P0)*np.random.randn(n,M)
    xhat = np.zeros((1,100))
    for t in range(0,100):
        e = np.kron(np.ones((1,M)), y[0][t]) - h(x)
        q = pe(e)
        q = q/np.sum(q)
        xhat[0][t] = np.sum(np.multiply(np.kron(np.ones((n,1)),q), x), 1)
        ind = resampling(q)
        x = x[:,ind]
        x = f(x,t) + np.sqrt(Q)*np.random.randn(n,M)
    return xhat


def TestPF():
    M = 1000
    P0 = np.array([[5]])
    Q = 10
    R = 1
    pe = lambda x : ((1/((2*np.pi*R)**(1/2)))*np.exp(-(x**2)/(2*R)))
    f = lambda x,t : ((x**2) + (25*x)/(1+x**2) + 8*np.cos(1.2*t))
    h = lambda x : ((x**2)/20)
    x = np.arange(1,101)
    y = np.arange(1,101)
    x[0] = sl.sqrtm(P0)*np.random.randn(1)
    y[0] = h(x[0]) + np.sqrt(R)*np.random.randn(1)

    for t in range(2,101):
        x[t-1] = f(x[t-1], t)
        y[t-1] = h(x[t-1]) + np.sqrt(R)*np.random.randn(1)

    xTrue = x
    xhat = PF(f,h,pe,Q,P0,M,y)
    return xTrue


TestPF()
'''
b = np.array([[1,16],[256,81]])
print(b)
a = np.array([5])
x = np.sqrtm(a)
print(x)
'''
