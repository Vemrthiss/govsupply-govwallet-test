// import { initDB, connectToDB } from "../src/db";

// jest.mock("../src/csv", () => ({
//   readCsvAndSave: jest.fn(),
// }));
// jest.mock("../src/db", () => ({
//   connectToDB: jest.fn(),
//   initDB: jest.fn(),
// }));

// jest.mock("pg", () => ({
//   Pool: jest.fn(() => ({
//     connect: jest.fn(() => ({
//       query: jest.fn(),
//       release: jest.fn(),
//     })),
//   })),
// }));

// describe("Database Functions", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("initDB", () => {
//     it("should initialize the database", async () => {
//       await initDB();

//       // Expect pool.connect() to be called
//       expect(connectToDB).toHaveBeenCalled();

//       // Expect table creation queries to have been executed
//       const mockClient = {
//         query: jest.fn(),
//         release: jest.fn(),
//       };
//       // @ts-ignore
//       connectToDB.mockResolvedValueOnce(mockClient);
//       expect(mockClient.query).toHaveBeenCalledTimes(3);

//       // Expect readCsvAndSave to have been called
//       expect(require("./csv").readCsvAndSave).toHaveBeenCalledWith(
//         "staff-id-to-team-mapping.csv",
//         mockClient
//       );
//     });
//   });
// });
