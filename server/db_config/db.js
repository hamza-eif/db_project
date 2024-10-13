import sql  from  'mysql2'

export const db=sql.createConnection({
    host:'sql5.freesqldatabase.com',
    user:'sql5735879',
    password:'28XV72sNmK',
    database:'sql5735879'
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database!');
    
  });
