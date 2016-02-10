<?php
if(isset($_POST['data']))
	fwrite(fopen("./data.json","W"),"./data.json");