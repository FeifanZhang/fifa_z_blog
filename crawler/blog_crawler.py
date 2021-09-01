def get_set(s:str):
    stack = []
    res = []
    def backtrace(s:str):
	    if len(s) == 0:
	        return
	    res.append("".join(stack))
	    for i in range(len(s)):
	        stack.append(s[i])
	        backtrace(s[:i]+s[i+1:])
	        stack.pop(-1)
	    return
    backtrace("abcd")
    print(res)
    return res