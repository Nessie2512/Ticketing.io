import { describe, test, expect } from '@jest/globals';
import { Entity } from './Entity';

describe("testing entity", () => {

const newEntity = new Entity({name: "test entity", description: "this is a test entity"});

expect(newEntity.id).toBeDefined();
expect(newEntity.createdAt).toBeInstanceOf(Date);
expect(newEntity.editedAt).toBeUndefined();

});