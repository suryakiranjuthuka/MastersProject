<?php

    //Initializing Elastic Search Client
    require '../vendor/autoload.php';

    $hosts = [
    //If you want to use the local Elasticsearch Server use 'localhost:9200'
    'localhost:9200'         // IP + Port
    //If you want to use the online Elasticsearch Server use 'alpha.dtex.lan:9200'
    //  'alpha.dtex.lan:9200'
    //  '192.168.1.2'              // Just IP
    //  'mydomain.server.com:9201', // Domain + Port
    //  'mydomain2.server.com',     // Just Domain
    //  'https://localhost',        // SSL to localhost
    //  'https://192.168.1.3:9200'  // SSL to IP + Port
    ];

    $ES = \Elasticsearch\ClientBuilder::create()->setHosts($hosts)->build();
