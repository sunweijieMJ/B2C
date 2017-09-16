<?php

	header("Content-type: text/html; charset=utf-8"); 
	$user = $_POST["user"];
	$pwd = $_POST["pwd"];
	if($user == "15201911830" && $pwd == "123456"){
		print 0;
	}else{
		print 1;
	}

?>