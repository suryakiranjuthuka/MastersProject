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
     Initilize Category of the Lists
     ========================================================================== */
  if (($_GET['page'] == 'category_lists') && ($_GET['action'] == 'getLists')) {
      //Search for All Lists
      $params = [
        'index' => 'lists',
        'type' => 'list',
        'size' => 200,
  //        'sort' => 'name:desc'
    ];

      $results = $ES->search($params);
      $allCategoryLists = $results['hits']['hits'];
      
      echo json_encode($allCategoryLists);
  }

  /* ==========================================================================
     Initilize all of the lexons
     ========================================================================== */
  if (($_GET['page'] == 'category_lexons') && ($_GET['action'] == 'getAllLexons')) {
      //Search for All Lexons
    $params = [
        'index' => 'lexons',
        'type' => $_GET['categoryId'],
        'size' => 200,
    ];

      $results = $ES->search($params);
      $allCategoryLexons = $results['hits']['hits'];

      echo json_encode($allCategoryLexons);
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
  
  
  
  //Update Publications
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

  
  
}
