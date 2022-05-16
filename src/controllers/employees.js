import EmployeeModels from '../models/Employees';

// get all employees
const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await EmployeeModels.find({});
    res.status(200).json({
      message: 'All employees',
      data: allEmployees,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

// get employee by id
const getEmployeeById = async (req, res) => {
  try {
    if (req.params.id) {
      const singleEmployee = await EmployeeModels.findById(req.params.id);
      res.status(200).json({
        message: `Employee with id ${req.params.id}`,
        data: singleEmployee,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

// get employee by firstName
const getEmployeeByFirstName = async (req, res) => {
  try {
    if (req.params.firstName) {
      const firstNameParam = req.params.firstName;
      const Employees = await EmployeeModels.find({ firstName: firstNameParam });
      res.status(200).json({
        message: `Employee with firstName ${firstNameParam}`,
        data: Employees,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing firstName parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

// get employee by lastName
const getEmployeeByLastName = async (req, res) => {
  try {
    if (req.params.lastName) {
      const lastNameParam = req.params.lastName;
      const Employees = await EmployeeModels.find({ lastName: lastNameParam });
      res.status(200).json({
        message: `Employee with lastName ${lastNameParam}`,
        data: Employees,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing lastName parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

// get employee by activity
const getEmployeeByActivity = async (req, res) => {
  try {
    if (req.params.active) {
      const activeParam = req.params.active;
      const Employees = await EmployeeModels.find({ active: activeParam });
      res.status(200).json({
        message: `Employee with status ${activeParam}`,
        data: Employees,
        error: false,
      });
    } else {
      res.status(400).json({
        message: 'missing active parameter',
        data: undefined,
        error: true,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new EmployeeModels({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      active: req.body.active,
    });
    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: undefined,
      error: true,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    if (!req.params) {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }

    const result = await EmployeeModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Employee updated',
      data: result,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      err: err.details[0].message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await EmployeeModels.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    res.status(204).json({
      message: 'The employee has been succesfully deleted',
      data: result,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: 'An error has ocurred',
      data: undefined,
      err: err.details[0].message,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeeById,
  getEmployeeByFirstName,
  getEmployeeByLastName,
  getEmployeeByActivity,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
