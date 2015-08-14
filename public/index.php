<?php

require '../vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'slim_project',
    'username'  => 'root',
    'password'  => 'password',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

// Set the event dispatcher used by Eloquent models... (optional)
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$capsule->setEventDispatcher(new Dispatcher(new Container));

// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();

$app = new \Slim\Slim();

$app->get('/', function() use ($app) {
    readfile('index.html');
    $app->stop();
});
$app->get('/contact', function() {
    $sql = "select * FROM users ORDER BY id";
    // echo json_encode(array($sql));
      try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $wines = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($wines);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
});

$app->get('/users/:id', function($id) {
    $sql = "SELECT * FROM users WHERE id=:id";
      try {
        $db = getConnection();
  		$stmt = $db->prepare($sql);
  		$stmt->bindParam("id", $id);
  		$stmt->execute();
  		$user = $stmt->fetchObject();
  		$db = null;
  		echo json_encode($user);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
});

$app->get('/users', function() {
    $sql = "select * FROM users ORDER BY id";
      try {
        $db = getConnection();
        $stmt = $db->query($sql);
        $wines = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($wines);
      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
      }
});
$app->post('/add', function() use ($app){
    $request = \Slim\Slim::getInstance()->request();
	$user = json_decode($request->getBody());
    $sql = "INSERT INTO users (username, first_name, last_name, address) VALUES (:username, :first_name, :last_name, :address)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("username", $user->username);
		$stmt->bindParam("first_name", $user->first_name);
		$stmt->bindParam("last_name", $user->last_name);
		$stmt->bindParam("address", $user->address);
		$stmt->execute();
		$user->id = $db->lastInsertId();
		$db = null;
		echo json_encode($user);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
});

$app->put('/edit/:id', function ($id) {

    //Update book identified by $id

    $request = \Slim\Slim::getInstance()->request();
    $body = $request->getBody();
    $user = json_decode($body);

    $sql = "UPDATE users SET username=:username, first_name=:first_name, last_name=:last_name, address=:address WHERE id=:id";
    try {
       $db = getConnection();
       $stmt = $db->prepare($sql);
       $stmt->execute(array(
           ":username" => $user->username,
           ":first_name" => $user->first_name,
           ":last_name" => $user->last_name,
           ":address" => $user->address,
           ":id" => $id
       ));
       $db = null;
       echo json_encode($user);

    } catch (PDOException $e) {
       echo '{"error":{"text": '. $e->getMessage() .'}}';
    }

});

$app->delete('/users/:id', function($id) {
    $sql = "DELETE FROM users WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
});

$app->run();
function getConnection() {
  $dbhost="127.0.0.1";
  $dbuser="root";
  $dbpass="password";
  $dbname="slim_project";
  $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  return $dbh;
}
