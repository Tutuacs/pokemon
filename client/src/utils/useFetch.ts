import { useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";
import { NavbarProfileProps, useNavbarContext } from "@/components/NavBarProviders";
// import { useToast } from "@/components/ui/use-toast";
// import { getToastConfig, toastConfig } from "@/components/ui/toastConfig";

const useFetch = (title?: string) => {
  const { data: session } = useSession();
  // const { setProfile } = useNavbarContext();
//   const { toast } = useToast();
  
  const refreshToken = async () => {
    if (!session || !session.tokens) return;

    const res = await fetch(`${Backend_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        authorization: `Refresh ${session.tokens.refresh}`,
      },
    });

    const response = await res.json();
    session.profile = response.profile;
    const profile: NavbarProfileProps = {...response.profile};

    // updateNavbarProfile(profile);
    session.tokens = response;
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    if (!session) return;

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${session.tokens.access}`,
    };

    if (!(new Date().getTime() < session.tokens.expiresIn)){
      await refreshToken();
      headers.Authorization = `Bearer ${session.tokens.access}`;
    }
    
    const res = await fetch(`${Backend_URL}${url}`, { ...options, headers });

    console.log("ResFetch",res);

    return handleResponse(res);
  };

  const handleResponse = async (res: Response) => {
    const data = await res.json();
    // const config = getToastConfig(res.status.toString());

    if (res.status === 200 || res.status === 201) {
      data.message = title;
    }

    // toast({ title: config!.title, description: data!.message, variant: config!.variant });

    return { data, status: res.status };
  };

  return { fetchWithAuth };
};

export default useFetch;
