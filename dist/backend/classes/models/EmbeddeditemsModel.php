<?php

require_once('core/init.php');

/**
 *
 * Class providing methods for operating
 * on the embeddeditem table
 *
 */

class EmbeddeditemsModel extends BaseModel {

    /**
     *
     * Method for getting data
     * based on some criteria.
     *
     * @param mixed[] $where An array of sub-arrays
     * where each sub-array represents a database column. Sub-array[0] contains
     * a database column name, sub-array[1] contains an operator and sub-array[2]
     * contains a value to be matched.
     *
     */

    public function get($where) {
        return $this->getDB()->get('embeddeditem', $where)->results();
    }

    /**
     *
     * Method for getting all data in the embeddeditem table.
     *
     */

	public function getAll() {
        return $this->getDB()->getAll('embeddeditem')->results();
    }

    /**
     *
     * Method for inserting data into embeddeditem.
     *
     * @param mixed[] $fields Array containing the values to be inserted.
     *
     */

    public function insert($fields) {
        return $this->getDB()->insert('embeddeditem', $fields);
    }

    /**
     *
     * Method for updating fields in the
     * database table embeddeditem.
     *
     * @param string $primaryKey A string providing the primary key
     * column/value pairs that identify the row to be updated in the database.
     *
     * @param mixed[] $fields An array of sub-arrays
     * where each sub-array represents a database column. Sub-array[0] contains
     * a database column name, sub-array[1] contains an operator (should always be '=') and
     * sub-array[3] contains the new column value.
     *
     */

    public function update($primaryKey, $fields) {
        return $this->getDB()->update('embeddeditem', $primaryKey, $fields);
    }

    /**
     *
     * Method for deleting database rows.
     *
     * @param mixed[] $where An array of sub-arrays specifying
     * the database row to be deleted, where sub-array[0] contains a database
     * column name, sub-array[1] contains an operator and
     * sub-array[3] contains the value to be matched.
     *
     */

    public function delete($where) {
        return $this->getDB()->delete('embeddeditem', $where);
    }
}
