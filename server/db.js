const Pool = require("pg").Pool;
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "linksapi",
  password: "admin",
  port: 5432,
});

const getLinks = (req, res) => {
  pool.query("SELECT * FROM favlinks ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const createLink = (req, res) => {
    pool.query("INSERT INTO favlinks(name, url) VALUES ($1, $2)", [req.body.name, req.body.url], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result);
    })
}

const deleteLink = (req, res) => {
    console.log(req.body)
    pool.query("DELETE FROM favlinks WHERE id = (SELECT id FROM favlinks LIMIT 1 OFFSET $1)", [req.body.index], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result);
    })
}

module.exports = {
  getLinks,
  createLink,
  deleteLink
};
