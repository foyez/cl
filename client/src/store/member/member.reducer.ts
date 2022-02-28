import type { Member } from "types";
import { ActionTypes } from "./member.types";

type MemberState = {
  memberList: Member[];
  isLoading: boolean;
  errorMsg: string;
};

interface FetchMembersStart {
  type: ActionTypes.FETCH_MEMBERS_START;
}
interface FetchMembersSuccess {
  type: ActionTypes.FETCH_MEMBERS_SUCCESS;
  payload: { memberList: Member[] };
}
interface FetchMembersFailure {
  type: ActionTypes.FETCH_MEMBERS_FAILURE;
  payload: { errorMsg: string };
}

interface AddMemberSuccess {
  type: ActionTypes.ADD_MEMBER_SUCCESS;
  payload: { member: Member };
}

interface AddMemberFailure {
  type: ActionTypes.ADD_MEMBER_FAILURE;
  payload: { errorMsg: string };
}

interface DeleteMemberSuccess {
  type: ActionTypes.DELETE_MEMBER_SUCCESS;
  payload: { deletedMemberId: number };
}

interface EditMemberSuccess {
  type: ActionTypes.EDIT_MEMBER_SUCCESS;
  payload: { member: Member };
}

type MemberAction =
  | FetchMembersStart
  | FetchMembersSuccess
  | FetchMembersFailure
  | AddMemberSuccess
  | AddMemberFailure
  | DeleteMemberSuccess
  | EditMemberSuccess;

const initialState: MemberState = {
  memberList: [],
  isLoading: false,
  errorMsg: "",
};

export const memberReducer = (
  state = initialState,
  action: MemberAction
): MemberState => {
  if (action.type === ActionTypes.FETCH_MEMBERS_START) {
    return { ...state, isLoading: true };
  }

  if (action.type === ActionTypes.FETCH_MEMBERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      memberList: action.payload.memberList,
    };
  }

  if (action.type === ActionTypes.ADD_MEMBER_SUCCESS) {
    return {
      ...state,
      memberList: [...state.memberList, action.payload.member],
    };
  }

  if (action.type === ActionTypes.EDIT_MEMBER_SUCCESS) {
    const memberToUpdate = action.payload.member;

    return {
      ...state,
      memberList: state.memberList.map((member) =>
        member.id === memberToUpdate.id ? memberToUpdate : member
      ),
    };
  }

  if (action.type === ActionTypes.DELETE_MEMBER_SUCCESS) {
    return {
      ...state,
      memberList: state.memberList.filter(
        (member) => member.id !== action.payload.deletedMemberId
      ),
    };
  }

  if (action.type === ActionTypes.FETCH_MEMBERS_FAILURE) {
    return { ...state, isLoading: false, errorMsg: action.payload.errorMsg };
  }

  return state;
};
