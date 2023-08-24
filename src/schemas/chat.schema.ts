import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Message extends Model<Message> {
        @Column({
                type: DataType.STRING,
                allowNull: false,
        })
        name: string;

        @Column({
                type: DataType.STRING,
                allowNull: false,
        })
        email: string;

        @Column({
                type: DataType.STRING,
                allowNull: false,
        })
        message: string;
}