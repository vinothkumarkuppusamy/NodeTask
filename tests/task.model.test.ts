import Task from '../src/models/task.model';

describe('Task Model Validation', () => {
  it('should throw validation error if required fields missing', async () => {
    try {
      const task = new Task({});
      await task.validate();
    } catch (err: any) {
      expect(err.errors.title).toBeDefined();
      expect(err.errors.dueDate).toBeDefined();
    }
  });
});