export type LabArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  accent: string;
  tag: string;
  specs: { label: string; value: string }[];
  steps: { title: string; text: string }[];
  networkTitle: string;
  networkBody: string;
  networkItems: string[];
  questions: { question: string; answer: string }[];
  takeaway: string;
};

export const labArticles: LabArticle[] = [
  {
    slug: "windows-server-2022-vmware-setup",
    eyebrow: "VMware Setup • Windows Server",
    title: "WINDOWS SERVER 2022",
    subtitle: "Building the control point of the lab",
    summary:
      "This was the most important VM in the first lab. I used it to learn how VMware networking, static addressing, DHCPv4, DNS options, and multiple network adapters fit together.",
    accent: "#35D3EB",
    tag: "Server • DHCP • Networking",
    specs: [
      { label: "Edition", value: "Windows Server 2022 Standard Evaluation (Desktop Experience)" },
      { label: "Memory", value: "4 GB" },
      { label: "CPU", value: "2 cores" },
      { label: "Disk", value: "60 GB, split" },
      { label: "NIC 1", value: "NAT" },
      { label: "NIC 2", value: "Custom VMnet19" },
      { label: "Lab IP", value: "192.168.1.254/24" },
      { label: "DHCP scope", value: "192.168.1.100–200" },
    ],
    steps: [
      {
        title: "Create a private VMware network",
        text: "I created VMnet19 as a host-only network using 192.168.1.0/24. VMware DHCP was disabled because Windows Server would become the DHCP server for the lab.",
      },
      {
        title: "Install Windows Server manually",
        text: "VMware Easy Install failed with a license-terms error, so I recreated the VM and attached the Server 2022 ISO manually. I selected Standard Evaluation with Desktop Experience instead of Server Core.",
      },
      {
        title: "Configure two network adapters",
        text: "The NAT adapter stayed automatic for VMware connectivity. The VMnet19 adapter was configured statically as 192.168.1.254/24 with the lab gateway and DNS settings.",
      },
      {
        title: "Deploy DHCPv4",
        text: "Using Server Manager, I installed the DHCP Server role and created a scope from 192.168.1.100 to 192.168.1.200 with router 192.168.1.1, DNS 192.168.1.254, and domain CSAI5500.COM.",
      },
    ],
    networkTitle: "Why the server needed two NICs",
    networkBody:
      "The server sat between two different VMware networks. One interface belonged to NAT, while the second belonged to the private VMnet19 lab. Keeping the roles separate made the topology easier to understand and troubleshoot.",
    networkItems: [
      "NAT adapter → VMware NAT / automatic IP",
      "VMnet19 adapter → 192.168.1.254/24",
      "VMware DHCP on VMnet19 → disabled",
      "Windows DHCP → enabled for clients",
    ],
    questions: [
      {
        question: "What is VMnet19, and why did we create it?",
        answer:
          "VMnet19 is a VMware virtual network. I treated it like a private virtual Ethernet segment for the lab so the VMs could communicate without being placed directly on my normal physical network.",
      },
      {
        question: "What is DHCP, and what is a DHCPv4 server?",
        answer:
          "DHCP automatically provides network settings such as an IPv4 address, subnet mask, gateway, and DNS information. DHCPv4 simply means DHCP for IPv4. In this lab, Windows Server was the machine providing those leases.",
      },
      {
        question: "Why disable VMware DHCP on VMnet19?",
        answer:
          "Because I wanted Windows Server to be the only DHCP authority on the private lab network. Leaving both enabled could create competing DHCP responses and make troubleshooting confusing.",
      },
      {
        question: "What is a Windows product key, and did I need one?",
        answer:
          "A product key is used to activate a licensed Windows installation. The evaluation ISO could be installed for the lab without entering a retail key.",
      },
      {
        question: "Desktop Experience or Server Core?",
        answer:
          "Desktop Experience includes the full Windows GUI and Server Manager. I accidentally installed Server Core first, then reinstalled Desktop Experience because the lab used graphical tools such as Add Roles and Features and the DHCP console.",
      },
      {
        question: "Why did VMware Easy Install fail?",
        answer:
          "Easy Install stopped with a Microsoft Software License Terms error. Switching to a manual ISO installation gave me direct control over the edition and installation flow.",
      },
      {
        question: "What did ‘EFI Network… Time out’ mean?",
        answer:
          "The VM could not find a bootable installer, so the firmware moved on to network/PXE boot. Attaching the ISO to the virtual CD/DVD drive and enabling Connect at power on fixed it.",
      },
      {
        question: "What are side-channel mitigations?",
        answer:
          "VMware warned that CPU side-channel protections were enabled. I left them on because this lab did not need nested virtualization and there was no reason to trade security for a small performance gain.",
      },
      {
        question: "Why did one adapter get a 169.254.x.x address?",
        answer:
          "That was APIPA. Windows assigned itself a link-local address because the adapter was expecting DHCP but no DHCP server was available on VMnet19 yet.",
      },
      {
        question: "What is the difference between WINS and DNS?",
        answer:
          "WINS is an older Windows/NetBIOS name-resolution system. The lab used DNS, so I left WINS blank and configured DNS through the DHCP scope instead.",
      },
    ],
    takeaway:
      "The biggest lesson was that a server role only makes sense when the network underneath it is understood. Building VMnet19, separating the two NICs, and watching APIPA disappear after the static configuration made DHCP much easier to understand.",
  },
  {
    slug: "windows-10-vmware-setup",
    eyebrow: "VMware Setup • Windows Client",
    title: "WINDOWS 10",
    subtitle: "Building the DHCP test client",
    summary:
      "The Windows client VM was created to test whether the Windows Server DHCP scope could automatically configure another machine on VMnet19.",
    accent: "#60A5FA",
    tag: "Client • DHCP • VMware",
    specs: [
      { label: "Edition", value: "Windows 10 22H2 x64" },
      { label: "Memory", value: "4 GB" },
      { label: "CPU", value: "2 cores" },
      { label: "Disk", value: "60 GB, split" },
      { label: "Network", value: "Custom VMnet19" },
      { label: "Addressing", value: "DHCP client" },
    ],
    steps: [
      {
        title: "Download the Windows 10 ISO",
        text: "I used Microsoft’s media creation workflow and generated a 64-bit Windows 10 ISO for the VM rather than upgrading the host computer.",
      },
      {
        title: "Create the VM manually",
        text: "The VM was created with the operating system installed later, then the Windows ISO was attached to the virtual CD/DVD drive. This avoided the Easy Install issue I had already seen on Windows Server.",
      },
      {
        title: "Connect only to VMnet19",
        text: "For the DHCP lab, the client was designed to sit on the private VMnet19 network and request its IPv4 settings from Windows Server.",
      },
      {
        title: "Verify the DHCP lease",
        text: "The intended verification step is ipconfig /all, checking that the client receives an address from the 192.168.1.100–200 scope along with the configured gateway and DNS values.",
      },
    ],
    networkTitle: "A client should not need a manual IP",
    networkBody:
      "The point of this VM was to prove the DHCP service. Instead of manually entering an address, the Windows client should request a configuration and receive it automatically from the server.",
    networkItems: [
      "Client network → VMnet19",
      "Addressing → DHCP",
      "Expected pool → 192.168.1.100–200",
      "DNS option → 192.168.1.254",
    ],
    questions: [
      {
        question: "Why use Windows 10 instead of Windows 11 for this lab?",
        answer:
          "Windows 10 was simpler to virtualize for a short lab because it avoided extra Windows 11 hardware requirements such as TPM and Secure Boot configuration.",
      },
      {
        question: "Should I click Update now or create installation media?",
        answer:
          "Update now is for upgrading the current computer. For VMware I needed installation media, so I used the media creation tool to create an ISO.",
      },
      {
        question: "Why can the first Windows boot take so long?",
        answer:
          "The first boot may be finishing installation, device setup, and background configuration while sharing CPU, RAM, and disk resources with the host and other VMs.",
      },
      {
        question: "Does a 60 GB virtual disk instantly consume 60 GB?",
        answer:
          "Normally the virtual disk grows as data is written, up to the configured maximum. Splitting it into multiple files also makes the VM easier to move.",
      },
      {
        question: "Why keep the client on VMnet19 instead of NAT for Lab 1?",
        answer:
          "The DHCP test was specifically about the private lab network. Putting the client on VMnet19 ensured the address came from my Windows Server DHCP scope rather than VMware’s NAT DHCP service.",
      },
    ],
    takeaway:
      "The Windows client was useful because it turned the DHCP configuration from a server-side setting into something measurable: a separate machine should be able to join the network and configure itself automatically.",
  },
  {
    slug: "kali-linux-vmware-setup",
    eyebrow: "VMware Setup • Kali Linux",
    title: "KALI LINUX",
    subtitle: "Building the lab workstation",
    summary:
      "Kali became the workstation I used for network diagnostics and the authorized reconnaissance lab. The setup focused on choosing the correct installer, keeping the desktop lightweight, and putting the VM on the right VMware network.",
    accent: "#705CFF",
    tag: "Kali • Linux • Security Lab",
    specs: [
      { label: "Image", value: "Kali Installer amd64" },
      { label: "Desktop", value: "Xfce" },
      { label: "Memory", value: "4 GB" },
      { label: "CPU", value: "2 cores" },
      { label: "Disk", value: "40 GB" },
      { label: "Lab 2 network", value: "NAT" },
    ],
    steps: [
      {
        title: "Choose the Installer image",
        text: "I used the standard Installer image rather than Weekly, NetInstaller, or Everything. It gave me an offline-capable installation with the normal customization flow.",
      },
      {
        title: "Create the VMware guest",
        text: "The VM was created as a Debian-compatible 64-bit Linux guest with 4 GB RAM, two CPU cores, a 40 GB virtual disk, and NAT networking for the reconnaissance lab.",
      },
      {
        title: "Keep Xfce and the recommended tools",
        text: "I kept Kali’s default Xfce desktop and the recommended/top tool collections. Xfce gave me a lightweight GUI without using unnecessary resources.",
      },
      {
        title: "Verify networking before scanning",
        text: "After installation I used ip addr to confirm the Kali NAT address and pinged the Metasploitable VM before doing any authorized discovery or scanning.",
      },
    ],
    networkTitle: "Why NAT made sense for the reconnaissance lab",
    networkBody:
      "Lab 2 required the participating systems to use NAT and communicate with each other. Kali received 192.168.148.130/24 while Metasploitable received 192.168.148.129.",
    networkItems: [
      "Kali NAT IP → 192.168.148.130",
      "Metasploitable → 192.168.148.129",
      "Windows Server NAT → 192.168.148.128",
      "VMware NAT subnet → 192.168.148.0/24",
    ],
    questions: [
      {
        question: "Which Kali download should I use?",
        answer:
          "I chose the standard Installer image. Weekly builds are less tested, NetInstaller depends more heavily on network access during setup, and the Everything image was unnecessary for this lab.",
      },
      {
        question: "Why Xfce?",
        answer:
          "Xfce is Kali’s default lightweight desktop. It keeps the VM responsive while still providing a full graphical environment.",
      },
      {
        question: "Why did VMware call the guest Debian?",
        answer:
          "Kali is Debian-based, so VMware’s Debian 64-bit compatibility profile is an appropriate guest type when Kali is not listed directly.",
      },
      {
        question: "Why verify ping before reconnaissance?",
        answer:
          "If basic IP connectivity does not work, discovery and scanning results become misleading. I first proved Kali could reach the Metasploitable target with zero packet loss.",
      },
      {
        question: "Why did netdiscover crash the first time?",
        answer:
          "The first run segfaulted. After confirming the interface name with ip -br addr and explicitly specifying eth0, netdiscover completed successfully.",
      },
    ],
    takeaway:
      "The most useful habit was validating the environment before using security tools. Knowing the interface, IP range, and target reachability made the later reconnaissance results much easier to trust.",
  },
  {
    slug: "metasploitable-vmware-setup",
    eyebrow: "VMware Setup • Intentionally Vulnerable Target",
    title: "METASPLOITABLE 2",
    subtitle: "Creating a controlled target VM",
    summary:
      "Metasploitable is intentionally vulnerable, so the most important part of the setup was not performance — it was controlling where the VM could communicate and making sure it stayed inside the authorized lab.",
    accent: "#F4B750",
    tag: "Target VM • Isolation • Lab",
    specs: [
      { label: "Type", value: "Prebuilt VMware VM" },
      { label: "Memory", value: "512 MB" },
      { label: "CPU", value: "1 core" },
      { label: "Disk", value: "8 GB" },
      { label: "Lab 2 network", value: "NAT only" },
      { label: "Observed IP", value: "192.168.148.129" },
    ],
    steps: [
      {
        title: "Extract and open the prebuilt VM",
        text: "Instead of installing from an ISO, I extracted the Metasploitable download and opened its VMware configuration file.",
      },
      {
        title: "Remove the extra network adapter",
        text: "The imported VM had a NAT adapter and a second host-only adapter. For Lab 2 I removed the extra adapter so the target used the same NAT network as Kali and Windows Server.",
      },
      {
        title: "Boot and identify the address",
        text: "After logging in, I used ifconfig to confirm that eth0 received 192.168.148.129/24 on the VMware NAT network.",
      },
      {
        title: "Use only as an authorized lab target",
        text: "Because the machine is intentionally vulnerable, I kept it away from bridged networking and treated it as a temporary training target rather than a normal internet-facing system.",
      },
    ],
    networkTitle: "Isolation matters more than convenience",
    networkBody:
      "Metasploitable is useful because it exposes many old services for training. That same design makes careless networking risky, so the VM should remain confined to a controlled lab environment.",
    networkItems: [
      "Interface → eth0",
      "Observed IP → 192.168.148.129",
      "Network → VMware NAT",
      "Bridged mode → avoided",
    ],
    questions: [
      {
        question: "What is Metasploitable?",
        answer:
          "It is an intentionally vulnerable Linux virtual machine designed for security training. It should be treated very differently from a normal production server.",
      },
      {
        question: "Why not use Bridged networking?",
        answer:
          "Bridged mode would place the vulnerable VM directly onto the physical network. I kept it inside VMware networking so the lab remained controlled.",
      },
      {
        question: "Why did I remove the second Host-only adapter?",
        answer:
          "Lab 2 required the participating devices to use NAT. Keeping one clear network path also made the target IP and scan results easier to interpret.",
      },
      {
        question: "How did I find the Metasploitable IP?",
        answer:
          "I ran ifconfig inside the VM and read the IPv4 address assigned to eth0. It was 192.168.148.129/24.",
      },
      {
        question: "Why power it off after the lab?",
        answer:
          "Because the VM intentionally runs outdated and insecure services. There is no benefit to leaving that exposure active when the training exercise is finished.",
      },
    ],
    takeaway:
      "Metasploitable taught me that lab safety starts with network design. An intentionally weak system can be useful for learning, but only when its exposure is deliberately controlled.",
  },
];

export function getLabArticle(slug: string) {
  return labArticles.find((article) => article.slug === slug);
}
