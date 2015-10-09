<%@ taglib prefix="c"
           uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="/chimera_web/css/content.css">
    <title>Chimera visualization</title>
</head>
<body>
<h2>Available chimeras</h2>

<form method="post" target="_blank">
    <table id="t01">

        <tr>
            <th>Name</th>
            <th>Last modified</th>
            <th>Size, mb</th>
            <th></th>
            <th></th>
        </tr>

        <c:forEach items="${files}" var="file">
            <tr>
                <td>
                    <c:out value="${file.getName()}"/>
                </td>
                <td>
                    <c:out value="${file.getLastUpdate()}"/>
                </td>
                <td>
                    <c:out value="${file.getSize()}"/>
                </td>
                <td>
                    <button type="submit" formtarget="_blank" name="file" value="${file.getAbsoluteName()}_F">Build frequency
                    </button>
                </td>
                <td>
                    <button type="submit" formtarget="_blank" name="file" value="${file.getAbsoluteName()}_P">Build phase
                    </button>
                </td>
            </tr>
        </c:forEach>
    </table>
</form>
</body>
</html>