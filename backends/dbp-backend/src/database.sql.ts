export const AddCustomer = "INSERT INTO Customers (NationalID, Name, LastName) VALUES(?,?,?)";
export const UpdateCustomer = "UPDATE Customers SET Name = ? , LastName = ? WHERE NationalID = ?";
export const AddAttraction = "INSERT INTO Attractions (Name, ContactNumber, PricePerKT ) VALUES(?,?,?)";
export const UpdateAttraction = "UPDATE Attractions SET ContactNumber = ? , PricePerKT = ? WHERE Name = ?";
export const AddReservations = "INSERT INTO Reservations (CustomerID, AttName, Date) VALUES(?,?,?)";
export const GroupReservations = "SELECT Customers.Name, Customers.LastName, Reservations.AttName, COUNT(Reservations.AttName) AS ReservationCount FROM Customers JOIN Reservations ON Customers.NationalID = Reservations.CustomerID WHERE Customers.NationalID = ? GROUP BY Customers.NationalID,Customers.Name,Customers.LastName,Reservations.AttName"
export const ReservationsByRange = "SELECT Reservations.AttName, Reservations.Date FROM Reservations WHERE Reservations.CustomerID = ? AND Reservations.Date BETWEEN ? AND ?"
export const GroupByAttraction ="SELECT Customers.Name AS CustomerName, Customers.LastName AS CustomerLastName, SUM(Attractions.PricePerKT) AS TotalCost FROM Customers JOIN Reservations ON Customers.NationalID = Reservations.CustomerID JOIN Attractions ON Reservations.AttName = Attractions.Name WHERE Attractions.Name = ? GROUP BY Customers.NationalID, Customers.Name, Customers.LastName"
