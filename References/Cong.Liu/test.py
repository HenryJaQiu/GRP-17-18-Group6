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
def resampling(q):
    qc = np.cumsum(q)
    M  = np.max()



def xhat(f,h,pe,Q,P0,M,y):

    n = np.size(P0,1)
    x = sl.sqrtm(P0)*np.random.randn(n,M)




'''
b = np.array([[1,16],[256,81]])
print(b)
a = np.array([5])
x = np.sqrtm(a)
print(x)
'''
