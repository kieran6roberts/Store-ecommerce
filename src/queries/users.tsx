import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UserMutation($id: Int_comparison_exp, $changes: users_set_input) {
    update_users(where: {id: $id}, _set: $changes) {
        returning {
        id
        name
        updated_at
        }
    }
}`;
/*
{
  "id": { "_eq": 1 },
  "changes": {
    "name": "Helena"
  }
}*/