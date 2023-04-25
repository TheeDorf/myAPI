class MyData {
    constructor(id, firstName, lastName, sport = null) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.sport = sport;
      this._created = new Date().toString();
    }
  }
  
  const PREPOP_DATA = [
    new MockData(1, "First", "Last", "admin"),
    new MockData(2, "First2", "Last2", "member"),
    new MockData(3, "First3", "Last3", "sport"),
    new MockData(4, "First4", "Last4", "sport"),
  ];
  
  class MyDB {
    #data = PREPOP_DATA;
    #nextId = 5;
  
    /**
     * Asynchronously resets the dataset to the default values.
     */
    async reset() {
      this.#data = PREPOP_DATA;
    }
  
    /**
     * Checks to see if all of the keys on the given object match the keys expected in MockData.
     * @param {MyData} obj
     * @returns {boolean} a boolean value indicating whether all of the input object's keys are valid keys.
     */
    isValidData(obj) {
      return Object.keys(obj).every((key) =>
        ["id", "firstName", "lastName", "sport", "_created"].includes(key)
      );
    }
  
    /**
     * Asynchronously adds a mock user object to the dataset.
     * @param {MyData} newUserDTO
     * @returns {{ insertedUser: MyData, success: boolean }} an object with two values: insertedRow and success
     */
    async add(newUserDTO) {
      if (this.isValidData(newUserDTO)) {
        let newUser = new MockData(
          this.#nextId++,
          newUserDTO.firstName,
          newUserDTO.lastName,
          newUserDTO.sport
        );
  
        this.#data.push(newUser);
  
        return {
          insertedRow: newUser,
          success: true,
        };
      } else {
        throw new Error("Invalid column names found");
      }
    }
  
    /**
     * Asynchronously finds and updates a mock user object by id.
     * @param {number} id
     * @param {MyData} updatedUserDTO
     * @returns {{ updatedUser: MyData, success: boolean }} an object with two values: updatedRow and success
     */
    async update(id, updatedUserDTO) {
      if (this.isValidData(updatedUserDTO)) {
        let updatedUser;
  
        this.#data = this.#data.map((value) => {
          if (value.id == id) {
            updatedUser = {
              ...value,
              ...updatedUserDTO,
            };
            return updatedUser;
          }
  
          return value;
        });
  
        return {
          updatedRow: updatedUser,
          success: true,
        };
      } else {
        throw new Error("Invalid column names found");
      }
    }
  
    /**
     * Asynchronously finds and returns a mock user object by id.
     * @param id number
     * @returns user object
     */
    async getOne(id) {
      return this.#data.find((value) => value.id == id) || null;
    }
  
    /**
     * Asynchronously returns a mock data list of user objects.
     * @returns array of users
     */
    async getAll() {
      return this.#data;
    }
  
    /**
     * Asynchronously finds and removes a mock user object by id.
     * @param {number} id
     * @returns {{ removedRowId: number, success: boolean }} an object with two values: removedRowId and success
     */
    async remove(id) {
      this.#data = this.#data.filter((value) => value.id != id);
  
      return {
        removedRowId: id,
        success: true,
      };
    }
  }
  
  let db = new MyDB();
  
  export default db;
  