import { describe, test, expect } from '@jest/globals';
import { Entity } from './Entity';

describe("testing entity", () => {

const newEntity = new Entity({name: "test entity", description: "this is a test entity"});

test("should create a new entity with the given properties", () => {
  
  expect(newEntity.id).toBeDefined();
})

test("should have createdAt and editedAt properties", () => {
  
  expect(newEntity.createdAt).toBeInstanceOf(Date);
})

test("should have the correct editedAt property", () => {
  expect(newEntity.editedAt).toBeUndefined();
})

test("should have the correct props", () => {
  expect(newEntity.props.name).toBe("test entity");
  expect(newEntity.props.description).toBe("this is a test entity");
  expect(newEntity.props).toEqual({name: "test entity", description: "this is a test entity"});
})

});