const db = require("../config/db"); // Adjust the path to your db.js

class Service {
  static async create() {
    const sql = `INSERT INTO Services (ServiceName, Description, MinDuration, MaxDuration, MinPrice, MaxPrice) VALUES
        ('Basic Manicure', 'Includes nail trimming, shaping, cuticle care, hand massage, and regular polish application.', 30, 45 , 15.00, 25.00),
        ('Basic Pedicure', 'Involves nail trimming, shaping, cuticle care, exfoliation, foot massage, and regular polish application.', 45, 60 , 25.00, 45.00),
        ('Gel Manicure', 'Gel polish applied for a long-lasting, chip-free finish. Includes nail shaping, cuticle care, and a hand massage.', 45, 60, 35.00, 50.00),
        ('Gel Pedicure', 'Gel polish on toenails with similar treatments as a basic pedicure. Lasts longer than regular polish.', 60, 75, 45.00, 60.00),
        ('Acrylic Nails', 'Artificial nails applied with acrylic to enhance length and shape, including nail design if requested.', 60, 90, 40.00, 70.00),
        ('Acrylic Fill(Maintenance)', 'A fill for acrylic nails, replacing the growth gap at the base, and adding fresh polish or design.', 45, 60, 30.00, 50.00),
        ('Dip Powder Nails', 'A method where nails are dipped into powder for a durable and chip-resistant finish, without UV light.', 60, 60, 40.00, 60.00),
        ('Nail Art Design(Add-on)', 'Includes custom designs: such as flowers, geometric patterns, rhinestones, or other decorative accents.', 15, 30, 05.00, 30.00),
        ('French Manicure', 'Classic nail look with a nude or pink base and white tips.', 45, 60, 25.00, 40.00),
        ('Paraffin Wax Treatment', 'A moisturizing treatment for the hands or feet, using warm paraffin wax to soften and hydrate the skin.', 20, 30, 10.00, 15.00),
        ('Nail Repair (Per Nail)', 'Fixing a broken or damaged nail, usually applied to acrylic or gel nails.', 15, 20, 5.00, 10.00),
        ('Manicure with Paraffin Wax', 'A complete manicure treatment, with the added benefit of a paraffin wax treatment for hydration.', 60, 60, 40.00, 55.00),
        ('Hot Stone Pedicure', 'A relaxing pedicure that includes hot stone massage for added relaxation and circulation improvement.', 75, 90, 60.00, 85.00),
        ('Deluxe Manicure', 'Includes all basic manicure services plus additional treatments like exfoliation, hand massage, and paraffin wax.', 60, 60, 40.00, 55.00),
        ('Deluxe Pedicure', 'A more luxurious pedicure including exfoliation, massage, mask, and sometimes paraffin wax or hot stones.', 75, 90, 55.00, 80.00)`;

    const [result] = await db.execute(sql);
    return result;
  }

  static async getAll() {
    const sql = `SELECT * FROM Services`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Add more CRUD methods as needed
}

module.exports = Service;
