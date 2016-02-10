<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: gleb
  Date: 2/10/16
  Time: 9:53 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Statistics</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2
        }

        th {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
<table>
    <tr>
        <th>Ip</th>
        <th>Visits</th>
    </tr>
    <c:forEach items="${data}" var="entry">
        <tr>
            <td><a href="http://www.w3schools.com/html/${entry.key}">${entry.key}</a></td>
            <td>${entry.value}</td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
