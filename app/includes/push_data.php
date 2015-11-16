<?php
  require_once 'init.php';
  
  $jsondata = file_get_contents('data.json');
  $json = json_decode($jsondata, true);
  
  //******************* IMPORT CATEGORIES FROM DATA.JSON *********************
 $allCategories = $json['category'];
 
 foreach ($allCategories as $category) {
     $params['body'][] = [
         'index' => [
             '_index' => 'categories',
             '_type' => 'category',
             '_id' => $category['id'],
         ],
     ];
 
     $params['body'][] = [
         'name' => $category['name'],
         'risk' => $category['risk'],
         'type' => $category['type'],
     ];
 }
 
 $responses = $ES->bulk($params);
 
 echo '<pre>',print_r($responses),'</pre>';
 
 //******************* IMPORT LISTS FROM DATA.JSON *********************
 $allCategoryLists = $json['list'];

 foreach ($allCategoryLists as $allCategoryList) {
     $params['body'][] = [
         'index' => [
             '_index' => 'lists',
             '_type' => 'list',
             '_id' => $allCategoryList['id'],
         ],
     ];

     $params['body'][] = [
         'name' => $allCategoryList['name'],
         'modified' => $allCategoryList['modified'],
         'type' => $allCategoryList['type'],
     ];
 }

 $responses = $ES->bulk($params);

 echo '<pre>',print_r($responses),'</pre>';

//******************* IMPORT CATEGORY LEXONS FROM DATA.JSON *********************
 $allCategoryLexons = $json['categoryLexons'];

 foreach ($allCategoryLexons as $id => $categoryLexon) {
     $i = 1;
     foreach ($categoryLexon as $row) {
         $params['body'][] = [
             'index' => [
                 '_index' => 'lexons',
                 '_type' => $id,
                 '_id' => $i,
             ],
         ];

         $params['body'][] = [
             'in/ex' => $row['in/ex'],
             'lexon' => $row['lexon'],
             'appliesTo' => $row['appliesTo'],
             'modified' => $row['modified'],
             'type' => $row['type'],
         ];
         ++$i;
     }
 }

 $responses = $ES->bulk($params);

 echo '<pre>',print_r($responses),'</pre>';

//******************* IMPORT WHITELISTS FROM DATA.JSON *********************
 $allCategories = $json['whitelist'];

 $i = 1;
 foreach ($allCategories as $category) {
     $params['body'][] = [
         'index' => [
             '_index' => 'whitelists',
             '_type' => 'whitelist',
             '_id' => $i,
         ],
     ];

     $params['body'][] = [
         'whitelistTargetType' => $category['whitelistTargetType'],
         'whitelistTarget' => $category['whitelistTarget'],
         'appliesToType' => $category['appliesToType'],
         'appliesTo' => $category['appliesTo'],
         'added' => $category['added'],
     ];
     ++$i;
 }

 $responses = $ES->bulk($params);

 echo '<pre>',print_r($responses),'</pre>';
 
?>