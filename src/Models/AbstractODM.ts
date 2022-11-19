import {
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>; // Importante discutir o `OE` anterior para definir esse trecho de código
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    // Comente que a classe mãe espera no construtor o Schema que define a Collection e o nome da Collection no banco.
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema); // A model é definida na classe mãe para evitar repetição de código nas classes filhas. Diferentemente do Schema, a Model é padrão em todos os ODMs.
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[] | null> {
    return this.model.find({});
  }

  public async findOne(_id: string): Promise<T | null> {
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: Partial<T>): Promise<void> {
    await this.model.updateOne(
      { _id },
      { ...obj } as UpdateQuery<T>,
    );
  }
}

export default AbstractODM;