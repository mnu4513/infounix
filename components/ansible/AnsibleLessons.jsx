// components/ansible/AnsibleLessons.js

export const AnsibleLessons = [

  {
    id: "intro-to-ansible",
    slug: "intro-to-ansible",
    title: "Introduction to Ansible",
    short:
      "Understand what is Ansible and why it is used in DevOps automation. Learn agentless architecture and SSH based communication. Difference between Ansible and other tools like Puppet and Chef. Real world use cases in server configuration.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "ansible-lab-setup",
    slug: "ansible-lab-setup",
    title: "Ansible Lab Setup",
    short:
      "Setup Ansible control node and managed nodes. Configure SSH key based authentication. Install Ansible on Linux system. Prepare practice lab for hands on learning.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "static-inventory",
    slug: "static-inventory",
    title: "Ansible Static Inventory",
    short:
      "Create and manage static inventory files. Group servers based on roles. Understand inventory variables. Real production style inventory structure.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "ansible-modules",
    slug: "ansible-modules",
    title: "Ansible Modules",
    short:
      "Learn most used Ansible modules like yum, service, file and copy. Understand idempotency concept. Module documentation usage. Practical admin examples.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "adhoc-command",
    slug: "adhoc-command",
    title: "Ad-hoc Command",
    short:
      "Execute one time tasks using ad-hoc commands. Manage services and packages quickly. Understand ansible command structure. Useful for daily administration.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "adhoc-examples",
    slug: "adhoc-examples",
    title: "Ad-hoc Command Examples",
    short:
      "Real life ad-hoc command scenarios. Restart services on multiple servers. Collect system information. Quick troubleshooting using Ansible.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "ansible-playbook",
    slug: "ansible-playbook",
    title: "Ansible Playbook",
    short:
      "Introduction to YAML based playbooks. Structure of plays and tasks. Write first automation playbook. Difference between ad-hoc and playbook.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "playbook-task",
    slug: "playbook-task",
    title: "Playbook Task",
    short:
      "Understand tasks execution in playbook. Multiple module usage in single play. Order of execution. Debugging playbook tasks.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "ansible-variables",
    slug: "ansible-variables",
    title: "Ansible Variables",
    short:
      "Use variables in Ansible for dynamic automation. Host and group variables. Variable precedence. Secure and reusable playbooks.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "conditionals",
    slug: "conditionals",
    title: "Conditionals in Ansible",
    short:
      "Use when condition in playbooks. Execute tasks based on OS or facts. Build intelligent automation. Real admin scenarios.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "loops",
    slug: "loops",
    title: "Loops in Ansible",
    short:
      "Automate repetitive tasks using loops. with_items and loop keyword. Create multiple users and packages. Efficient automation design.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "handlers",
    slug: "handlers",
    title: "Handlers",
    short:
      "Use handlers to restart services after changes. Notify and listen concept. Avoid unnecessary restarts. Production best practice.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "templates",
    slug: "templates",
    title: "Templates Jinja2",
    short:
      "Create dynamic configuration using Jinja2 templates. Manage config files. Use variables inside templates. Real web server examples.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "roles",
    slug: "roles",
    title: "Ansible Roles",
    short:
      "Organize playbooks using roles. Standard directory structure. Reusable automation code. Industry level project design.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "dynamic-inventory",
    slug: "dynamic-inventory",
    title: "Dynamic Inventory",
    short:
      "Use dynamic inventory for cloud servers. AWS and other providers. Script based inventory. Scalable automation approach.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "ansible-vault",
    slug: "ansible-vault",
    title: "Ansible Vault",
    short:
      "Encrypt passwords and sensitive data. Use vault in playbooks. Secure credentials management. DevOps security practice.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "error-handling",
    slug: "error-handling",
    title: "Error Handling",
    short:
      "Handle failures in playbooks. ignore_errors and failed_when. Rescue and always blocks. Reliable automation scripts.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "tags",
    slug: "tags",
    title: "Tags in Ansible",
    short:
      "Run specific tasks using tags. Skip unwanted tasks. Speed up execution. Useful in large playbooks.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "ansible-config",
    slug: "ansible-config",
    title: "Ansible Configuration",
    short:
      "Understand ansible.cfg settings. Configure forks and timeout. Performance tuning. Production configuration.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "webserver-project",
    slug: "webserver-project",
    title: "Real Project – Web Server Deployment",
    short:
      "Deploy Apache using Ansible end to end. Install package, configure service and firewall. Production style project.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "multi-server",
    slug: "multi-server",
    title: "Multi Server Automation",
    short:
      "Automate multiple servers together. Load balancer and app server setup. Real DevOps scenario. Infrastructure automation.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

  {
    id: "interview-questions",
    slug: "interview-questions",
    title: "Ansible Interview Preparation",
    short:
      "Top Ansible interview questions and answers. Scenario based questions. DevOps job preparation. Fresher to experienced level.",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  },

];
