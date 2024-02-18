import {
  getStaff,
  checkTeamHasRedeemed,
  processTeamRedemption,
} from "../src/functions";
import { STAFF_TABLE, connectToDB } from "../src/db";

jest.mock("../src/db", () => ({
  connectToDB: jest.fn(),
}));

const mockStaff = {
  staff_pass_id: "ABC",
  team_name: "XYZ",
  created_at: 1000000000,
};

describe("getStaff", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return staff when called with valid parameters (staff_pass_id)", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({
        rows: [mockStaff],
      }),
      release: jest.fn(),
    };
    // @ts-ignore
    connectToDB.mockResolvedValueOnce(mockClient);

    const staff = await getStaff({ staff_id: mockStaff.staff_pass_id });

    expect(staff).toEqual([mockStaff]);
    expect(mockClient.query).toHaveBeenCalledWith(
      expect.stringContaining(
        `SELECT * FROM ${STAFF_TABLE} WHERE staff_pass_id = '${mockStaff.staff_pass_id}'`
      )
    );
    expect(mockClient.release).toHaveBeenCalled();
  });

  it("should return staff when called with valid parameters (staff_pass_id)", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({
        rows: [mockStaff],
      }),
      release: jest.fn(),
    };
    // @ts-ignore
    connectToDB.mockResolvedValueOnce(mockClient);

    const staff = await getStaff({ team_name: mockStaff.team_name });

    expect(staff).toEqual([mockStaff]);
    expect(mockClient.query).toHaveBeenCalledWith(
      expect.stringContaining(
        `SELECT * FROM ${STAFF_TABLE} WHERE team_name = '${mockStaff.team_name}'`
      )
    );
    expect(mockClient.release).toHaveBeenCalled();
  });

  it("should return staff when called with valid parameters both params", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({
        rows: [mockStaff],
      }),
      release: jest.fn(),
    };
    // @ts-ignore
    connectToDB.mockResolvedValueOnce(mockClient);

    const staff = await getStaff({
      staff_id: mockStaff.staff_pass_id,
      team_name: mockStaff.team_name,
    });

    expect(staff).toEqual([mockStaff]);
    expect(mockClient.query).toHaveBeenCalledWith(
      expect.stringContaining(
        `SELECT * FROM ${STAFF_TABLE} WHERE staff_pass_id = '${mockStaff.staff_pass_id}' AND team_name = '${mockStaff.team_name}'`
      )
    );
    expect(mockClient.release).toHaveBeenCalled();
  });
});

describe("checkTeamHasRedeemed", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it("should return true if team has redeemed", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({
        rows: [
          {
            id: 0,
            team_name: "team_name",
            redeemed_at: 1000000,
          },
        ],
      }),
      release: jest.fn(),
    };
    // @ts-ignore
    connectToDB.mockResolvedValueOnce(mockClient);

    const hasRedeemed = await checkTeamHasRedeemed("team_name");

    expect(hasRedeemed).toBe(true);
  });

  it("should return false if team has not redeemed", async () => {
    const mockClient = {
      query: jest.fn().mockResolvedValue({
        rows: [],
      }),
      release: jest.fn(),
    };
    // @ts-ignore
    connectToDB.mockResolvedValueOnce(mockClient);

    const hasRedeemed = await checkTeamHasRedeemed("team_name");

    expect(hasRedeemed).toBe(false);
  });
});
