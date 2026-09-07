import {
  createMemberSchema,
  updateMemberSchema,
} from "../validatorsSchema/member.validator.js";

import {
  createMemberService,
  getMembersService,
  getMemberService,
  updateMemberService,
  deleteMemberService,
} from "../services/member.service.js";

// Create Member
export const createMember = async (req, res) => {
  try {
    const result = createMemberSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const member = await createMemberService({
      organizationId: req.params.organizationId,

      userId: req.user.userId,

      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: "Organization member created successfully",
      data: {
        member,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Members
export const getMembers = async (req, res) => {
  try {
    const members = await getMembersService({
      organizationId: req.params.organizationId,

      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      data: {
        members,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get One Member
export const getMember = async (req, res) => {
  try {
    const member = await getMemberService({
      organizationId: req.params.organizationId,

      memberId: req.params.memberId,

      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      data: {
        member,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Member
export const updateMember = async (req, res) => {
  try {
    const result = updateMemberSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    const member = await updateMemberService({
      organizationId: req.params.organizationId,

      memberId: req.params.memberId,

      userId: req.user.userId,

      ...result.data,
    });

    return res.status(200).json({
      success: true,
      message: "Organization member updated successfully",
      data: {
        member,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Member
export const deleteMember = async (req, res) => {
  try {
    await deleteMemberService({
      organizationId: req.params.organizationId,

      memberId: req.params.memberId,

      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Organization member deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
