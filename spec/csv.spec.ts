// import { readCsvAndSave } from "../src/csv"; // Update the file path accordingly

// // Mock fs and fast-csv modules
// jest.mock("fs", () => ({
//   createReadStream: jest.fn(() => ({
//     pipe: jest.fn(),
//   })),
// }));

// jest.mock("fast-csv", () => ({
//   parse: jest.fn(() => ({
//     on: jest.fn((event, callback) => {
//       if (event === "data") {
//         callback({
//           staff_pass_id: "123",
//           team_name: "Team A",
//           created_at: 123456,
//         });
//       } else if (event === "end") {
//         callback();
//       }
//     }),
//   })),
// }));

// // Mock the PoolClient
// const mockClient = {
//   query: jest.fn(),
// };

// describe("readCsvAndSave", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear mock calls before each test
//   });

//   it("should read CSV and save data to the database", () => {
//     readCsvAndSave("staff-id-to-team-mapping.csv", mockClient);

//     // Expect fs.createReadStream and fastcsv.parse to be called with the correct file path
//     expect(require("fs").createReadStream).toHaveBeenCalledWith(
//       "./csv/staff-id-to-team-mapping.csv"
//     );
//     expect(require("fast-csv").parse).toHaveBeenCalled();

//     // Expect client.query to be called twice for inserting teams and staff
//     expect(mockClient.query).toHaveBeenCalledTimes(2);

//     // Expect client.query to be called with the correct SQL statements
//     expect(mockClient.query).toHaveBeenCalledWith(
//       "INSERT INTO team (team_name) VALUES ('Team A')",
//       expect.any(Function)
//     );
//     expect(mockClient.query).toHaveBeenCalledWith(
//       "INSERT INTO staff (staff_pass_id, team_name, created_at) VALUES ('123', 'Team A', 123456)",
//       expect.any(Function)
//     );
//   });
// });
