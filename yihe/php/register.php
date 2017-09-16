<?php
	
	$usn = $_REQUEST['username'];

	// 定义数组模拟数据库
	$arr = array("sunweijie", "sunwukong", "zhubajie", "xiaolongnv", "yangguo");

	$result = array("isOk" => true);
	$result['msg'] = "";
	foreach($arr as $v){
		if($usn == $v){
			$result["isOk"] = false;
			$result['msg'] = $usn."已经被注册";
			break;
		}
	}
	
	// 输出
	print json_encode($result);
?>