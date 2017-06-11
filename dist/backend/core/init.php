<?php
session_start();

$GLOBALS['config'] = array(
    'mysql' => array(
        'host'      => 'mysql.dsv.su.se',
        'username'  => 'siol0547',
        'password'  => 'Exahch9phai7',
        'db'        => 'siol0547'
    ),
    'session' => array(
        'session_name' => 'user',
        'token_name'   => 'token'
    )
);

spl_autoload_register(function($class) {

    if(preg_match('/[a-zA-Z]+Controller$/', $class)) {

        require_once 'classes/controllers/' . $class . '.php';

    } elseif(preg_match('/[a-zA-Z]+Model$/', $class)) {

        require_once 'classes/models/' . $class . '.php';

    } elseif(preg_match('/[a-zA-Z]+View$/', $class)) {

        require_once 'classes/views/' . $class . '.php';

    } else {

        require_once 'classes/' . $class . '.php';

    }

});
