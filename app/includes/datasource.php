<?php

require_once 'init.php';

//Get Records
if (isset($_GET['page']) && isset($_GET['action'])) {

  /* ==========================================================================
     Initilize all of the Home Content
     ========================================================================== */
  if (($_GET['page'] == 'home') && ($_GET['action'] == 'getHome')) {
      //Search for home index
      $params = [
        'index' => 'home',
        'size' => 200
      ];
      
      $results = $ES->search($params);
      $home = $results['hits']['hits'];
      echo json_encode($home);
      // echo "<pre>",print_r($home),"</pre>";
  }
  
  
  
  /* ==========================================================================
     Initilize All Publications
     ========================================================================== */
  if (($_GET['page'] == 'publications') && ($_GET['action'] == 'getPublications')) {
      //Search for publication index
      $params = [
        'index' => 'publications',
        'size' => 300
      ];
      
      $results = $ES->search($params);
      $publications = $results['hits']['hits'];
      echo json_encode($publications);
  }
  
  
  
  /* ==========================================================================
     Initilize All Grad Students
     ========================================================================== */
  if (($_GET['page'] == 'gradStudents') && ($_GET['action'] == 'getGradStudents')) {
      //Search for publication index
      $params = [
        'index' => 'grad-students',
        'size' => 300
      ];
      
      $results = $ES->search($params);
      $gradStudents = $results['hits']['hits'];
      echo json_encode($gradStudents);
  }
  


  /* ==========================================================================
     CRUD All Publications
     ========================================================================== */
   // CREATE PUBLICATIONS
   if (($_GET['page'] == 'publications') && ($_GET['action'] == 'create')) {
       //Create a Publication
     $params = [
       'index' => 'publications',
       'type' => $_GET['type'],
       'body' => [
                   'point' => $_GET['formData']
                 ],
     ];
     $response = $ES->index($params);

     //Get Created Publication
     $params = [
       'index' => 'publications',
       'type' => $_GET['type'],
       'id' => $response['_id'],
     ];

     // Get doc at /my_index/my_type/my_id
     $response1 = $ES->get($params);
     echo json_encode($response1);
   }
   
  // DELETE PUBLICATIONS
  if (($_GET['page'] == 'publications') && ($_GET['action'] == 'delete')) {
      //Delete a publication
    $params = [
        'index' => 'publications',
        'type' => $_GET['type'],
        'id' => $_GET['id']
    ];
    $response = $ES->delete($params);
    echo json_encode($response);
  }
  
  //UPDATE Publications
  if (($_GET['page'] == 'publications') && ($_GET['action'] == 'update')) {
      //Update a Publication
    $params = [
      'index' => 'publications',
      'type' => $_GET['type'],
      'id' => $_GET['id'],
      'body' => [
                  'point' => $_GET['formData']
                ],
    ];
    $response = $ES->index($params);
    echo json_encode($response);
  }

  
  /* ==========================================================================
     CRUD All GRAD STUDENTS
  ========================================================================== */
// CREATE Student
if (($_GET['page'] == 'gradStudents') && ($_GET['action'] == 'create')) {
    //Create a Publication
  $params = [
    'index' => 'grad-students',
    'type' => $_GET['type'],
    'body' => [
                'point' => $_GET['formData']
              ],
  ];
  $response = $ES->index($params);

  //Get Created Student
  $params = [
    'index' => 'grad-students',
    'type' => $_GET['type'],
    'id' => $response['_id'],
  ];

  // Get doc at /my_index/my_type/my_id
  $response1 = $ES->get($params);
  echo json_encode($response1);
}

// DELETE Grad Student
if (($_GET['page'] == 'gradStudents') && ($_GET['action'] == 'delete')) {
   //Delete a Student
 $params = [
     'index' => 'grad-students',
     'type' => $_GET['type'],
     'id' => $_GET['id']
 ];
 $response = $ES->delete($params);
 echo json_encode($response);
}

//UPDATE Grad Student
if (($_GET['page'] == 'gradStudents') && ($_GET['action'] == 'update')) {
   //Update a Student
 $params = [
   'index' => 'grad-students',
   'type' => $_GET['type'],
   'id' => $_GET['id'],
   'body' => [
               'point' => $_GET['formData']
             ],
 ];
 $response = $ES->index($params);
 echo json_encode($response);
}




  
}
