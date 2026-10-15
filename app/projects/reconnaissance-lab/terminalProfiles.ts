import type { TerminalProfile } from "@/components/labs/InteractiveTerminal";

export const terminals: TerminalProfile[] = [
  {
    id: "winserver",
    title: "Windows Server 2022",
    subtitle: "Server / DHCP / NAT",
    prompt: "C:\\Users\\Administrator>",
    badge: "Windows Server",
    tone: "windows",
    commands: [
      {
        command: "ipconfig",
        output:
          "Ethernet adapter NAT:\n   IPv4 Address. . . . . . . . . . . : 192.168.148.128\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.148.2",
        explanation:
          "Shows the basic IPv4 configuration for the Windows Server NAT interface observed during the lab.",
      },
      {
        command: "ipconfig /all",
        output:
          "NAT adapter\n  DHCP Enabled: Yes\n  IPv4 Address: 192.168.148.128\n  Default Gateway: 192.168.148.2\n\nVMnet19-LAB adapter\n  DHCP Enabled: No\n  IPv4 Address: 192.168.1.254\n  Subnet Mask: 255.255.255.0\n  DNS Server: 192.168.1.254",
        explanation:
          "Displays detailed addressing information, including which interface uses DHCP and which interface is statically configured.",
      },
      {
        command: "ping 192.168.148.129",
        output:
          "Pinging 192.168.148.129 with 32 bytes of data:\nReply from 192.168.148.129: bytes=32 time<1ms TTL=64\nReply from 192.168.148.129: bytes=32 time<1ms TTL=64\n\nPing statistics: 0% loss",
        explanation:
          "Checks basic IP reachability from Windows Server to the Metasploitable lab target.",
      },
      {
        command: "hostname",
        output: "WIN-Q6T4K7V80T3",
        explanation:
          "Returns the Windows computer name. The VMware VM name and the guest operating system hostname can be different.",
      },
    ],
  },
  {
    id: "win10",
    title: "Windows 10 Client",
    subtitle: "DHCP client / VMnet19",
    prompt: "C:\\Users\\LabUser>",
    badge: "Windows Client",
    tone: "windows",
    commands: [
      {
        command: "ipconfig",
        output:
          "Ethernet adapter Ethernet:\n   IPv4 Address. . . . . . . . . . . : 192.168.1.100 (example lease)\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1",
        explanation:
          "Shows what a successful DHCP lease from the Windows Server scope would look like. The exact client lease can vary.",
      },
      {
        command: "ipconfig /all",
        output:
          "DHCP Enabled: Yes\nDHCP Server: 192.168.1.254\nDNS Servers: 192.168.1.254\nConnection-specific DNS Suffix: CSAI5500.COM",
        explanation:
          "Used to verify the IP address, DHCP server, DNS server, and domain option delivered to the client.",
      },
      {
        command: "ping 192.168.1.254",
        output:
          "Pinging 192.168.1.254 with 32 bytes of data:\nReply from 192.168.1.254: bytes=32 time<1ms TTL=128\n\nPing statistics: 0% loss (simulated)",
        explanation:
          "Tests whether the Windows client can reach the Windows Server interface on VMnet19.",
      },
      {
        command: "getmac",
        output:
          "Physical Address    Transport Name\n00-0C-29-XX-XX-XX   \\Device\\Tcpip_{...}",
        explanation:
          "Displays the MAC address associated with the Windows network adapter. The exact address is different for every VM.",
      },
      {
        command: "arp -a",
        output:
          "Interface: 192.168.1.100\n  Internet Address      Physical Address      Type\n  192.168.1.1           00-50-56-xx-xx-xx     dynamic\n  192.168.1.254         00-0c-29-xx-xx-xx     dynamic",
        explanation:
          "Shows cached IPv4-to-MAC mappings learned on the local network. Values here are representative.",
      },
    ],
  },
  {
    id: "kali",
    title: "Kali Linux",
    subtitle: "Authorized reconnaissance workstation",
    prompt: "kali@kali:~$",
    badge: "Kali",
    tone: "kali",
    commands: [
      {
        command: "ip addr",
        output:
          "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>\n    inet 192.168.148.130/24 brd 192.168.148.255 scope global dynamic eth0",
        explanation:
          "Confirms Kali's interface and NAT address before any lab reconnaissance is attempted.",
      },
      {
        command: "ping -c 4 192.168.148.129",
        output:
          "64 bytes from 192.168.148.129: icmp_seq=1 ttl=64 time=0.969 ms\n64 bytes from 192.168.148.129: icmp_seq=2 ttl=64 time=3.87 ms\n64 bytes from 192.168.148.129: icmp_seq=3 ttl=64 time=1.74 ms\n64 bytes from 192.168.148.129: icmp_seq=4 ttl=64 time=1.01 ms\n\n4 packets transmitted, 4 received, 0% packet loss",
        explanation:
          "Verifies basic reachability to the Metasploitable target before using discovery or scanning tools.",
      },
      {
        command: "sudo netdiscover -i eth0 -r 192.168.148.0/24",
        output:
          "192.168.148.1    00:50:56:c0:00:08  VMware, Inc.\n192.168.148.2    00:50:56:ef:86:d3  VMware, Inc.\n192.168.148.128  00:0c:29:41:c9:10  VMware, Inc.\n192.168.148.129  00:0c:29:6f:47:86  VMware, Inc.\n192.168.148.254  00:50:56:e0:56:6b  VMware, Inc.",
        explanation:
          "Replays the authorized lab discovery result. The simulator accepts only this fixed private lab range.",
      },
      {
        command: "sudo nmap -p 1-1000 192.168.148.129",
        output:
          "21/tcp open ftp\n22/tcp open ssh\n23/tcp open telnet\n25/tcp open smtp\n53/tcp open domain\n80/tcp open http\n111/tcp open rpcbind\n139/tcp open netbios-ssn\n445/tcp open microsoft-ds\n512/tcp open exec\n513/tcp open login\n514/tcp open shell",
        explanation:
          "Replays the port scan performed only against the intentionally vulnerable Metasploitable VM in the controlled lab.",
      },
      {
        command: "sudo nmap -O 192.168.148.129",
        output:
          "Device type: general purpose\nRunning: Linux 2.6.X\nOS details: Linux 2.6.9 - 2.6.33\nNetwork Distance: 1 hop",
        explanation:
          "Shows an OS fingerprinting estimate. Nmap guesses operating systems from network behavior; the result is not an absolute guarantee.",
      },
      {
        command: "sudo nmap -sV 192.168.148.129",
        output:
          "21/tcp   open  ftp         vsftpd 2.3.4\n22/tcp   open  ssh         OpenSSH 4.7p1\n53/tcp   open  domain      ISC BIND 9.4.2\n80/tcp   open  http        Apache httpd 2.2.8\n139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X\n3306/tcp open  mysql       MySQL 5.0.51a\n5432/tcp open  postgresql  PostgreSQL 8.3.x",
        explanation:
          "Shows how service-version detection adds context beyond a simple open/closed port list. This is a replay of the lab output, not a live scan.",
      },
    ],
  },
  {
    id: "meta",
    title: "Metasploitable 2",
    subtitle: "Intentionally vulnerable training target",
    prompt: "msfadmin@metasploitable:~$",
    badge: "Target VM",
    tone: "metasploitable",
    commands: [
      {
        command: "ifconfig",
        output:
          "eth0      Link encap:Ethernet  HWaddr 00:0c:29:6f:47:86\n          inet addr:192.168.148.129  Bcast:192.168.148.255  Mask:255.255.255.0\n          UP BROADCAST RUNNING MULTICAST  MTU:1500",
        explanation:
          "Shows the actual Metasploitable interface address observed during the lab.",
      },
      {
        command: "hostname",
        output: "metasploitable",
        explanation: "Displays the Linux hostname of the target VM.",
      },
      {
        command: "netstat -rn",
        output:
          "Kernel IP routing table\nDestination     Gateway         Genmask         Flags Iface\n192.168.148.0   0.0.0.0         255.255.255.0 U     eth0\n0.0.0.0         192.168.148.2   0.0.0.0       UG    eth0",
        explanation:
          "Shows the routing table: the local VMware NAT subnet is directly connected and the NAT gateway is used for other traffic.",
      },
      {
        command: "ping -c 4 192.168.148.130",
        output:
          "64 bytes from 192.168.148.130: icmp_seq=1 ttl=64 time=0.8 ms\n64 bytes from 192.168.148.130: icmp_seq=2 ttl=64 time=0.9 ms\n\n4 packets transmitted, 4 received, 0% packet loss (simulated replay)",
        explanation:
          "Demonstrates the reverse-connectivity concept from the target back to the Kali VM.",
      },
    ],
  },
];
