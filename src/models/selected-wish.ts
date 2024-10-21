import Wish from "@/models/wish";

export default interface SelectedWish {
	"id": number,
	"userId": number,
	"wishId": number,
	"wish": Wish
}

