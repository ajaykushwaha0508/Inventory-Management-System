import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { useSnackbar } from "notistack";

import UsersHeader from "../components/users/UsersHeader";
import UserStatsGrid from "../components/users/UserStatsGrid";
import UserIdentityForm from "../components/users/UserIdentityForm";
import RoleAssignmentCard from "../components/users/RoleAssignmentCard";
import ActiveOperatorDirectory from "../components/users/ActiveOperatorDirectory";

import {
  createMember,
  getOrganizationMembers,
} from "../services/member.service";

import { getMyOrganizationsService } from "../services/organizationService";

export default function UserProvisioning() {
  const [identity, setIdentity] = useState(null);
  const [role, setRole] = useState("USER");
  const [organizationId, setOrganizationId] = useState(null);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const response = await getMyOrganizationsService();

        const organization = response.data?.[0];

        if (!organization?._id) {
          enqueueSnackbar("No organization found.", {
            variant: "error",
          });

          return;
        }

        setOrganizationId(organization._id);

        const membersResponse = await getOrganizationMembers(organization._id);

        setMembers(membersResponse.data || []);
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.message ||
            "Failed to load organization members.",
          {
            variant: "error",
          },
        );
      }
    };

    loadOrganization();
  }, []);

  const handleCancel = () => {
    console.log("cancelled provisioning");
  };

  const handleProvision = async () => {
    if (!organizationId) {
      enqueueSnackbar("Organization not found.", {
        variant: "error",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await createMember(organizationId, {
        name: identity?.fullName,
        loginId: identity?.operatorId,
        password: identity?.password,
        role: role.toUpperCase(),
      });

      enqueueSnackbar(
        response.message || "Organization member created successfully!",
        {
          variant: "success",
        },
      );

      const membersResponse = await getOrganizationMembers(organizationId);

      setMembers(membersResponse.data || []);
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "Failed to create member. Please try again.",
        {
          variant: "error",
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 p-6">
      <UsersHeader />

      <UserStatsGrid
        adminCount={members.filter((member) => member.role === "ADMIN").length}
        operatorCount={
          members.filter((member) => member.role === "USER").length
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        <div>
          <UserIdentityForm value={identity} onChange={setIdentity} />

          <RoleAssignmentCard value={role} onChange={setRole} />

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="text-sm font-medium border border-slate-200 rounded-lg px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleProvision}
              disabled={isLoading || !organizationId}
              className="flex items-center gap-1.5 bg-[#5850ec] hover:bg-[#4c45d1] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors"
            >
              <UserPlus className="w-4 h-4" />

              {isLoading ? "Provisioning..." : "Provision Operator"}
            </button>
          </div>
        </div>

        <ActiveOperatorDirectory
          activeCount={members.length}
          totalCount={members.length}
          onViewAll={() => console.log("view all operators")}
          onOperatorMenu={(op) => console.log("menu for:", op.id)}
          operators={members}
        />
      </div>
    </main>
  );
}
