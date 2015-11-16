<?php

require_once 'init.php';



//Get Records
if (isset($_GET['page']) && isset($_GET['action'])) {

  /* ==========================================================================
     Initilize all of the categories
     ========================================================================== */
  if (($_GET['page'] == 'index') && ($_GET['action'] == 'getAllCategories')) {
      //Search for All Categories
      $params = [
        'index' => 'categories',
        'type' => 'category',
        'size' => 200,
  //        'sort' => 'name:desc'
    ];

      $results = $ES->search($params);
      $allCategories = $results['hits']['hits'];
      //    echo "<pre>",print_r($allCategories),"</pre>";

      //proof of concept only, DO NOT render unbound data like this.
      echo json_encode($allCategories);
  }
  
  /* ==========================================================================
     Initilize All Lists
     ========================================================================== */
  if (($_GET['page'] == 'list') && ($_GET['action'] == 'getAllLists')) {
      //Search for All Lists
      $params = [
        'index' => 'lists',
        'type' => 'list',
        'size' => 200,
  //        'sort' => 'name:desc'
    ];

      $results = $ES->search($params);
      $allLists = $results['hits']['hits'];
      
      echo json_encode($allLists);
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
}

//Create/Update Records
if (isset($_POST['page']) && isset($_POST['action'])) {

  /* ==========================================================================
     Create Lexon
     ========================================================================== */
  if (($_POST['page'] == 'category_lexons') && ($_POST['action'] == 'createLexon')) {
      //Create a Lexon
    $params = [
        'index' => 'lexons',
        'type' => $_POST['categoryId'],
        'body' => [
                    'in/ex' => 1,
                    'lexon' => $_POST['lexonName'],
                    'appliesTo' => 'title',
                    'modified' => 'July 22nd',
                    'type' => 'custom',
                  ],
    ];
      $response = $ES->index($params);

    //Get Created Lexon
    $params = [
        'index' => 'lexons',
        'type' => $_POST['categoryId'],
        'id' => $response['_id'],
    ];

    // Get doc at /my_index/my_type/my_id
    $response1 = $ES->get($params);
      echo json_encode($response1);
  }
  
  /* ==========================================================================
     Create List
     ========================================================================== */
  if (($_POST['page'] == 'category_lists') && ($_POST['action'] == 'createList')) {
    //Create a Lexon
    
    $listID = rand(40, 100);
    
    $params = [
        'index' => 'lists',
        'type' => 'list',
        'id' => $listID,
        'body' => [
                    'name' => $_POST['listName'],
                    'modified' => 'July 22nd',
                    'type' => 'custom',
                  ],
    ];
      $response = $ES->index($params);

    //Get Created Lexon
    $params = [
        'index' => 'lists',
        'type' => 'list',
        'id' => $response['_id'],
    ];

    // Get doc at /my_index/my_type/my_id
    $response1 = $ES->get($params);
      echo json_encode($response1);
  }
  
  /* ==========================================================================
     Save Search
     ========================================================================== */
  if (($_POST['page'] == 'category_lists') && ($_POST['action'] == 'saveSearch')) {
    //Save Search to Kibana
    $id = addslashes($_POST['id']);
    $title = addslashes($_POST['title']);
    $query = addslashes($_POST['query']);
    $params = [
        'index' => '.kibana',
        'type' => 'search',
        'id' => $id,
        'body' => [
                    'title' => $title,
                    'description' => '',
                    'hits' => '0',
                    'columns' => [
                      '_source'
                    ],
                    'sort' => [
                      'timestamp',
                      'desc'
                    ],
                    'version' => 1,
                    'kibanaSavedObjectMeta' => [
                      'searchSourceJSON' => "{\"index\":\"audit\",\"highlight\":{\"pre_tags\":[\"@kibana-highlighted-field@\"],\"post_tags\":[\"@/kibana-highlighted-field@\"],\"fields\":{\"*\":{}}},\"filter\":[],\"query\":{\"query_string\":{\"query\":\"". $query ."\",\"analyze_wildcard\":true}}}"
                    ]
                  ]
    ];
      $response = $ES->index($params);
      echo "<pre>",print_r($response),"</pre>";
  }
  
}


$params = [
  'index' => 'categories',
  'type' => 'category',
  'size' => 200,
//        'sort' => 'name:desc'
];

$results = $ES->search($params);
$allCategories = $results['hits']['hits'];
//    echo "<pre>",print_r($allCategories),"</pre>";

//proof of concept only, DO NOT render unbound data like this.
echo json_encode($allCategories);