<?php
  require_once 'init.php';
  
  $jsondata = file_get_contents('../data/data.json');
  $json = json_decode($jsondata, true);
  
  //******************* IMPORT HOME FROM DATA.JSON *********************
 // $allHome = $json['home'];
 // 
 // foreach ($allHome as $name => $home) {
 //     $params['body'][] = [
 //         'index' => [
 //             '_index' => 'home',
 //             '_type' => $name
 //            //  '_id' => $category['id'],
 //         ],
 //     ];
 // 
 //     $params['body'][] = [
 //         $name => $home
 //        //  'risk' => $home['subParas']
 //     ];
 //     
 //    //  echo $name;
 //    //  echo '<pre>',print_r($params),'</pre>';
 // 
 // }
 // 
 // $responses = $ES->bulk($params);
 // 
 // echo '<pre>',print_r($responses),'</pre>';
 
 //******************* IMPORT LISTS FROM DATA.JSON *********************
 // $allCategoryLists = $json['list'];
 // 
 // foreach ($allCategoryLists as $allCategoryList) {
 //     $params['body'][] = [
 //         'index' => [
 //             '_index' => 'lists',
 //             '_type' => 'list',
 //             '_id' => $allCategoryList['id'],
 //         ],
 //     ];
 // 
 //     $params['body'][] = [
 //         'name' => $allCategoryList['name'],
 //         'modified' => $allCategoryList['modified'],
 //         'type' => $allCategoryList['type'],
 //     ];
 // }
 // 
 // $responses = $ES->bulk($params);
 // 
 // echo '<pre>',print_r($responses),'</pre>';

//******************* IMPORT PUBLICATIONS FROM DATA.JSON *********************
 $allPublications = $json['publications'];
 
 foreach ($allPublications as $key => $publications) {
     $i = 1;
     foreach ($publications as $row) {
         $params['body'][] = [
             'index' => [
                 '_index' => 'publications',
                 '_type' => $key,
                 '_id' => $i,
             ],
         ];
 
         $params['body'][] = [
             'point' => $row['point']
         ];
         ++$i;
     }
 }
 
 $responses = $ES->bulk($params);
 
 echo '<pre>',print_r($responses),'</pre>';

//******************* IMPORT WHITELISTS FROM DATA.JSON *********************
 // $allCategories = $json['whitelist'];
 // 
 // $i = 1;
 // foreach ($allCategories as $category) {
 //     $params['body'][] = [
 //         'index' => [
 //             '_index' => 'whitelists',
 //             '_type' => 'whitelist',
 //             '_id' => $i,
 //         ],
 //     ];
 // 
 //     $params['body'][] = [
 //         'whitelistTargetType' => $category['whitelistTargetType'],
 //         'whitelistTarget' => $category['whitelistTarget'],
 //         'appliesToType' => $category['appliesToType'],
 //         'appliesTo' => $category['appliesTo'],
 //         'added' => $category['added'],
 //     ];
 //     ++$i;
 // }
 // 
 // $responses = $ES->bulk($params);
 // 
 // echo '<pre>',print_r($responses),'</pre>';
 
?>