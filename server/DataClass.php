<?php
class DataClass{

    private $dbh;
    /**
     * DataClass constructor.
     */
    public function __construct()
    {
        $this->dbh = new \PDO('mysql:host=localhost;dbname=blog', "root", "zpf6008");
        $this->dbh->query("SET NAMES 'UTF8'");
    }

    function getArticleList($page){
        $offset = 8;
        $limit = $offset * ($page);
        $re = $this->dbh->query("select * from article limit {$limit},{$offset}");
        return $re->fetchAll(PDO::FETCH_ASSOC  );
    }

    function getDetail($id){
        $re = $this->dbh->query("select * from article where id=".$id);
        return $re->fetch(PDO::FETCH_ASSOC  );
    }
}