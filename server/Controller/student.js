import { db } from "../../server/db_config/db.js";

export const get_programs = async (req, res) => {
    const q = "SELECT * FROM tbl_programs";
    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
      }
      console.log(data);
      res.status(200).json(data);
    });
  };


  export const get_dec = async (req, res) => {
    const programId = req.params.id;
    console.log("Program _ID",programId);
  
    const query = `
        SELECT l.dec_id, l.name, r.description
        FROM tbl_dec l
        INNER JOIN tbl_dec_of_program r ON l.dec_id = r.dec_id
        WHERE r.program_id = ?;
    `;
  
    db.query(query, [programId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }
  
        if (results.length === 0) {
            return res.status(404).send('No departments found for this program ID');
        }
  
        res.json(results);
    });
  };

  export const get_sem=async(req,res)=>{
    const q = "SELECT * FROM tbl_sem";
    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
        }
        // console.log(data);
        res.status(200).json(data);
      })
  }

  export const get_sec=async(req,res)=>{
    const q = "SELECT * FROM tbl_sections";
    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database query error' });
        }
        // console.log(data);
        res.status(200).json(data);
      })
  }