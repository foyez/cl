import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Member } from "types";
import { ActionTypes } from "./member.types";

const fetchMembersStart = () => ({
  type: ActionTypes.FETCH_MEMBERS_START,
});

const fetchMembersSuccess = (memberList: Member[]) => ({
  type: ActionTypes.FETCH_MEMBERS_SUCCESS,
  payload: { memberList },
});

const fetchMembersFailure = (errMsg: string) => ({
  type: ActionTypes.FETCH_MEMBERS_FAILURE,
  payload: { errMsg },
});

const addMemberSuccess = (member: Member) => ({
  type: ActionTypes.ADD_MEMBER_SUCCESS,
  payload: { member },
});

const addMemberFailure = (errMsg: string) => ({
  type: ActionTypes.ADD_MEMBER_FAILURE,
  payload: { errMsg },
});

const deleteMemberSuccess = (deletedMemberId: number) => ({
  type: ActionTypes.DELETE_MEMBER_SUCCESS,
  payload: { deletedMemberId },
});

const deleteMemberFailure = (errMsg: string) => ({
  type: ActionTypes.DELETE_MEMBER_FAILURE,
  payload: { errMsg },
});

const editMemberSuccess = (member: Member) => ({
  type: ActionTypes.EDIT_MEMBER_SUCCESS,
  payload: { member },
});

const editMemberFailure = (errMsg: string) => ({
  type: ActionTypes.EDIT_MEMBER_FAILURE,
  payload: { errMsg },
});

const fetchMembers =
  (team: string | undefined = undefined) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchMembersStart());

    try {
      const url = `http://localhost:4000/profile${team ? `?team=${team}` : ""}`;
      const res = await (await fetch(url)).json();

      dispatch(fetchMembersSuccess(res.data));
    } catch (err) {
      dispatch(fetchMembersFailure(""));
    }
  };

const addMember = (formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const url = "http://localhost:4000/profile";
    const res = await (
      await fetch(url, {
        method: "POST",
        body: formData,
      })
    ).json();

    dispatch(addMemberSuccess(res.data));
  } catch (err) {
    dispatch(addMemberFailure(""));
  }
};

const deleteMember = (memberId: number) => async (dispatch: Dispatch) => {
  try {
    const url = `http://localhost:4000/profile/${memberId}`;
    await fetch(url, { method: "DELETE" });

    dispatch(deleteMemberSuccess(memberId));
  } catch (err) {
    dispatch(deleteMemberFailure(""));
  }
};

const editMember =
  (memberId: number, formData: FormData) => async (dispatch: Dispatch) => {
    try {
      const url = `http://localhost:4000/profile/${memberId}`;
      const res = await (
        await fetch(url, {
          method: "PUT",
          body: formData,
        })
      ).json();

      dispatch(editMemberSuccess(res.data));
    } catch (err) {
      dispatch(editMemberFailure(""));
    }
  };

export const useMemberActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    { fetchMembers, addMember, deleteMember, editMember },
    dispatch
  );
};
