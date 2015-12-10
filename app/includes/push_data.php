<?php
  require_once 'init.php';
  
  $jsondata = file_get_contents('../data/data.json');
  $json = json_decode($jsondata, true);
  
//******************* IMPORT HOME FROM DATA.JSON *********************
 $allHome = $json['home'];
 
 foreach ($allHome as $name => $home) {
     $params['body'][] = [
         'index' => [
             '_index' => 'home',
             '_type' => $name
            //  '_id' => $category['id'],
         ],
     ];
 
     $params['body'][] = [
         $name => $home
        //  'risk' => $home['subParas']
     ];
     
    //  echo $name;
    //  echo '<pre>',print_r($params),'</pre>';
 
 }
 
 $responses = $ES->bulk($params);
 
 echo '<pre>',print_r($responses),'</pre>';
 
 
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
 


//******************* IMPORT GRAD STUDENTS FROM DATA.JSON *********************
   $allGradStudents = $json['gradStudents'];
   
   foreach ($allGradStudents as $key => $gradStudents) {
       $i = 1;
       foreach ($gradStudents as $row) {
           $params['body'][] = [
               'index' => [
                   '_index' => 'grad-students',
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



 // //******************* IMPORT GRANT ACTIVITIES FROM DATA.JSON *********************
   $allGrantActivities = $json['grantActivities'];
   
   foreach ($allGrantActivities as $key => $grantActivities) {
         $params['body'][] = [
             'index' => [
                 '_index' => 'grant-activities',
                 '_type' => 'allActivities'
             ],
         ];
     
         $params['body'][] = [
             'point' => $grantActivities['point']
         ];
     }
     
     $responses = $ES->bulk($params);
     echo '<pre>',print_r($responses),'</pre>';
   
   
 
?>