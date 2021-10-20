﻿using Dad_A_Store.Models;
using Dad_A_Store.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Dad_A_Store.DataAccess
{
  public class PaymentRepository
  {

    readonly string _connectionString;

    // Connection configuration string in Startup
    public PaymentRepository(IConfiguration config)
    {
      _connectionString = config.GetConnectionString("TempDataAStore");
    }

    // GetALL Method
    internal IEnumerable<Payment> GetAllPayments()
    {
      // Creates connection to database
      using var db = new SqlConnection(_connectionString);

      // SQL query 
      var sql = @"SELECT *
                  FROM PAYMENTS";

      // Query the database, store results in a list
      var payments = db.Query<Payment>(sql).ToList();

      return payments;
    }

    internal List<Payment> GetPaymentByID(Guid paymentID)
    {
      // Creates connection to db
      using var db = new SqlConnection(_connectionString);

      // SQL Query string
      var sql = @"SELECT *
                  FROM PAYMENTS
                  WHERE PaymentID = @paymentID";

      // PaymentsID List() variable
      var payments = db.Query<Payment>(sql, new { paymentID }).ToList();

      return payments;
    }

    internal void Add(Payment newPayment)
    {
      using var db = new SqlConnection(_connectionString);

      var sql = @"IF NOT EXISTS(SELECT * 
                                FROM Payments
                                WHERE  PaymentType = @PaymentType
                                )
                   INSERT INTO Payments (PaymentType)
                   OUTPUT INSERTED.ID
                   VALUES (@PaymentType)";

      var ID = db.ExecuteScalar<Guid>(sql, newPayment);
      newPayment.PaymentID = ID;
    }

    internal void RemovePayment(Guid ID)
    {
      using var db = new SqlConnection(_connectionString);
      var sql = @"IF EXISTS(SELECT * 
                            FROM Payments
                            WHERE  PaymentID = @ID
                            )
                   DELETE 
                   FROM Payments 
                   WHERE PaymentID = @ID";

      db.Execute(sql, new { ID });
    }


  }
}
