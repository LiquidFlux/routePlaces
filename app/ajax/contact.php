<?php

	$form_data = array();

	$form_data['postData'] = $_POST;

	if( $_POST['name'] == '' || $_POST['email'] == '' || $_POST['message'] == '' ){

		$form_data['success'] = false;

	} else {
		// send the email
		$form_data['success'] = true;

		$uri = 'https://mandrillapp.com/api/1.0/messages/send.json';

		$postString = '{
		"key": "y5sccBwL1Hb42MeoLWgbiA",
		"message": {
		    "html": "Name: ' . $_POST['name'] . '<br />Email: ' . $_POST['email'] . '<br />Number: ' . $_POST['number'] . '<br />Message: ' . $_POST['message'] . '",
		    "text": "Name: ' . $_POST['name'] . '<br />Email: ' . $_POST['email'] . '<br />Number: ' . $_POST['number'] . '<br />Message: ' . $_POST['message'] . '",
		    "subject": "Contact Form - ' . $_POST['name'] . ' | ' . $_POST['email'] . '",
		    "from_email": "me@charlescarnell.co.uk",
		    "from_name": "' . $_POST['name'] . '",
		    "to": [
		        {
		            "email": "me@charlescarnell.co.uk",
		            "name": "Bob"
		        }
		    ],
		    "headers": {

		    },
		    "track_opens": true,
		    "track_clicks": true,
		    "auto_text": true,
		    "url_strip_qs": true,
		    "preserve_recipients": true,

		    "merge": true,
		    "global_merge_vars": [

		    ],
		    "merge_vars": [

		    ],
		    "tags": [

		    ],
		    "google_analytics_domains": [

		    ],
		    "google_analytics_campaign": "...",
		    "metadata": [

		    ],
		    "recipient_metadata": [

		    ],
		    "attachments": [

		    ]
		},
		"async": false
		}';

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $uri);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true );
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);

		$result = curl_exec($ch);

		

	}


	echo json_encode($form_data);
	
?>