## http 简介
http 超文本传输协议，主要规定浏览器和服务器相互通信规则，它是基于TCP/IP通信协议来进行传递数据
浏览器发起一http请求， 首先建立TCP连接  也就是常说的三次握手， 接下来发起Http请求
一个http请求主要包括 请求行 请求头 请求正文
请求行：请求地址、请求的方法（get， post、put、delete）、请求状态
2** 成功
3** 重定向
    301 永久重定向
    302 临时重定向
    304 not modify
4** 客户端错误
    400 Bad request 请求中有语法错误
    401 Unauthorize 未被授权
    403 forbidden
    404 Not found
5** 服务端错误
    500 
    503 service unavailable
请求头
 Accept 
 host 
 UserAgent
 cookie （key value domin expires size httponly）4k 最多可以有20个 默认到浏览器关闭
 connection keep-alive
请求体
http 响应请求 
 响应行 
 响应体
  cache-control
  content-type
  status
  expires
  date
  Last-Modified
结束
断开 TCP 连接 四次挥手
## https = http + ssl
 