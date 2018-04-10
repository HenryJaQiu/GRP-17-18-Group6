#! usr/bin/env python3
import numpy as np
import matplotlib.pyplot as plt

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

def PF(f,h,pe,Q,P0,M,y):

    n = np.size(P0,1)
    x = np.sqrt(P0)*np.random.randn(n,M)
    xhat = np.zeros((1,100))
    for t in range(0,100):
        e = np.kron(np.ones((1,M)), y[0][t]) - h(x)
        q = pe(e)
        q = np.divide(q,np.sum(q))
        xhat[0][t] = np.sum(np.multiply(np.kron(np.ones((n,1)),q), x), 1)
        ind = resampling(q)
        ind = ind.astype(int)
        x = x[0][ind]
        x = f(x,t) + np.sqrt(Q)*np.random.randn(n,M)
    return xhat


def resampling(q):
    qc = cumsum(q)
    M = np.max(q.shape)
    u = (np.arange(0, M) + np.random.uniform(0, 1, 1))/M
    i = np.zeros((1, M))
    k = 0
    for j in range(0, M):
        while qc[k] < u[j]:
            k = k + 1
        i[0][j] = k
    return i


def TestPF():
    M = 100000
    P0 = np.array([[5]])
    Q = 10
    R = 1
    pe = lambda x : ((1/((2*np.pi*R)**(1/2)))*np.exp(-(x**2)/(2*R)))
    f = lambda x, t : ((x/2) + (25*x)/(1+x**2) + 8*np.cos(1.2*t))
    h = lambda x : ((x**2)/20)
    x = np.array([np.arange(1,101)])
    y = np.array([np.arange(1,101)])
    x[0] = np.sqrt(P0)*np.random.randn(1)
    y[0] = h(x[0]) + np.sqrt(R)*np.random.randn(1)

    for t in range(1,100):
        x[0][t] = f(x[0][t-1], t-1)
        y[0][t] = h(x[0][t]) + np.sqrt(R)*np.random.randn(1)

    xTrue = x
    xhat = PF(f,h,pe,Q,P0,M,y)
    plt_x = [i for i in range(1,101)]
    plt.plot(plt_x, xhat[0], '--', plt_x, xTrue[0],'r')
    plt.show(block=True)



TestPF()

