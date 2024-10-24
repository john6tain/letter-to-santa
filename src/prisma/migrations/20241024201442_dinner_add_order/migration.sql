-- AlterTable
CREATE SEQUENCE dinner_order_seq;
ALTER TABLE "Dinner" ALTER COLUMN "order" SET DEFAULT nextval('dinner_order_seq');
ALTER SEQUENCE dinner_order_seq OWNED BY "Dinner"."order";
