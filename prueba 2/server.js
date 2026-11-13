const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'glowe.db');
const db = new Database(dbPath);
app.use(express.json({limit:'100kb'}));
app.use(express.static(path.join(__dirname,'public')));
db.exec(`CREATE TABLE IF NOT EXISTS products (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 category TEXT NOT NULL,
 description TEXT NOT NULL DEFAULT '',
 price INTEGER NOT NULL DEFAULT 0,
 image_url TEXT NOT NULL DEFAULT '',
 product_url TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);
const categories=['Limpieza','Hidratación','Tratamiento','Protección solar','Cuidado corporal','Accesorios'];
const demo=[
['Gel limpiador suave','Limpieza','Limpieza diaria sin sensación tirante.',42000,'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/limpiadores/limpiador-facial-hidratante'],
['Agua micelar','Limpieza','Una opción práctica para retirar residuos y maquillaje.',35000,'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85','https://www.bioderma.com.co/nuestros-productos'],
['Sérum de ácido hialurónico','Hidratación','Sérum hidratante para complementar tu rutina.',68000,'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/loci%C3%B3n-hidratante-para-uso-diario'],
['Crema hidratante facial','Hidratación','Textura de uso diario para una piel confortable.',59000,'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/crema-hidratante'],
['Mascarilla facial','Tratamiento','Un momento extra de cuidado en tu ritual semanal.',28000,'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=85','https://www.bioderma.com.co/cuidados/sensibio'],
['Sérum iluminador','Tratamiento','Un paso adicional para una rutina enfocada en luminosidad.',72000,'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/hidratantes-faciales'],
['Protector solar facial','Protección solar','Protección solar para incorporar a la rutina de día.',64000,'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/piel-normal'],
['Bálsamo labial','Hidratación','Un esencial práctico para llevar contigo.',18000,'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=85','https://www.bioderma.com.co/nuestros-productos/labios'],
['Exfoliante corporal','Cuidado corporal','Exfoliante corporal para un ritual de cuidado en casa.',38000,'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85','https://www.bioderma.com.co/nuestros-productos/atoderm'],
['Loción corporal','Cuidado corporal','Loción para dejar la piel con sensación suave.',46000,'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/crema-terapeutica-para-manos'],
['Rodillo facial','Accesorios','Accesorio para acompañar un masaje facial suave.',32000,'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/hidratantes-corporales'],
['Toalla facial suave','Accesorios','Un complemento para tu rutina de limpieza.',22000,'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/crema-terapeutica-para-manos'],
['Crema de manos','Cuidado corporal','Un cuidado sencillo para llevar en el bolso.',25000,'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/crema-hidratante'],
['Tónico hidratante','Hidratación','Un paso opcional para completar tu rutina facial.',44000,'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/loci%C3%B3n-hidratante-para-uso-diario'],
['Bálsamo limpiador','Limpieza','Una alternativa para la primera limpieza de la noche.',51000,'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=85','https://www.bioderma.com.co/nuestros-productos'],
['Crema de noche','Tratamiento','Una crema para tu rutina nocturna.',69000,'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=85','https://www.cerave.co/cuidado-de-la-piel/hidratantes/hidratantes-faciales']
];
// Actualiza enlaces de ejemplo en bases de datos creadas con versiones anteriores.
const placeholders = db.prepare("SELECT id FROM products WHERE product_url='https://example.com' ORDER BY id").all();
const updateLink = db.prepare('UPDATE products SET product_url=? WHERE id=?');
placeholders.forEach((row, index) => updateLink.run(demo[index % demo.length][5], row.id));

if(db.prepare('SELECT COUNT(*) AS n FROM products').get().n===0){
 const insert=db.prepare('INSERT INTO products(name,category,description,price,image_url,product_url) VALUES(?,?,?,?,?,?)');
 db.transaction(rows=>rows.forEach(row=>insert.run(...row)))(demo);
}
// En producción, las operaciones de escritura requieren una clave de administrador.
function requireAdmin(req, res, next) {
 const key = process.env.ADMIN_API_KEY;
 if (process.env.NODE_ENV === 'production' && (!key || req.get('x-admin-key') !== key)) {
  return res.status(403).json({ error: 'Acceso de administrador requerido.' });
 }
 next();
}
function validate(p){
 if(!p||!['name','category','product_url'].every(k=>typeof p[k]==='string'&&p[k].trim()))return 'Nombre, categoría y enlace del producto son obligatorios.';
 if(!categories.includes(p.category))return 'Categoría no válida.';
 if(!Number.isInteger(Number(p.price))||Number(p.price)<0)return 'El precio debe ser un entero igual o mayor que cero.';
 try{const u=new URL(p.product_url);if(!['http:','https:'].includes(u.protocol))return 'El enlace debe usar HTTP o HTTPS.';if(p.image_url){const im=new URL(p.image_url);if(!['http:','https:'].includes(im.protocol))return 'La imagen debe usar HTTP o HTTPS.';}}catch{return 'Hay una dirección URL no válida.';}
 return null;
}
app.get('/api/health',(_req,res)=>res.json({status:'ok',service:'GLOWÉ API'}));
app.get('/api/products',(req,res)=>{
 const q=String(req.query.q||'').trim(), category=String(req.query.category||''); let sql='SELECT * FROM products WHERE 1=1',args=[];
 if(q){sql+=' AND (name LIKE ? OR category LIKE ? OR description LIKE ?)';args.push(`%${q}%`,`%${q}%`,`%${q}%`);}
 if(categories.includes(category)){sql+=' AND category=?';args.push(category);}
 res.json(db.prepare(sql+' ORDER BY id').all(...args));
});
app.get('/api/products/:id',(req,res)=>{const row=db.prepare('SELECT * FROM products WHERE id=?').get(Number(req.params.id));if(!row)return res.status(404).json({error:'Producto no encontrado'});res.json(row);});
app.post('/api/products',requireAdmin,(req,res)=>{const error=validate(req.body);if(error)return res.status(400).json({error});const p=req.body;const result=db.prepare('INSERT INTO products(name,category,description,price,image_url,product_url) VALUES(?,?,?,?,?,?)').run(p.name.trim(),p.category,String(p.description||''),Number(p.price),String(p.image_url||''),p.product_url.trim());res.status(201).json(db.prepare('SELECT * FROM products WHERE id=?').get(result.lastInsertRowid));});
app.put('/api/products/:id',requireAdmin,(req,res)=>{const error=validate(req.body);if(error)return res.status(400).json({error});const p=req.body;const result=db.prepare('UPDATE products SET name=?,category=?,description=?,price=?,image_url=?,product_url=? WHERE id=?').run(p.name.trim(),p.category,String(p.description||''),Number(p.price),String(p.image_url||''),p.product_url.trim(),Number(req.params.id));if(!result.changes)return res.status(404).json({error:'Producto no encontrado'});res.json(db.prepare('SELECT * FROM products WHERE id=?').get(Number(req.params.id)));});
app.delete('/api/products/:id',requireAdmin,(req,res)=>{const result=db.prepare('DELETE FROM products WHERE id=?').run(Number(req.params.id));if(!result.changes)return res.status(404).json({error:'Producto no encontrado'});res.json({message:'Producto eliminado'});});
app.listen(PORT,()=>console.log(`GLOWÉ listo en http://localhost:${PORT}`));
