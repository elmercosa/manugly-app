<Accordion className="p-0" motionProps={motionProps}>
  <AccordionItem
    key="1"
    aria-label="Usuarios"
    title="Usuarios"
    classNames={{
      trigger: "py-0",
      heading:
        "hover:bg-emerald-500 hover:text-white px-4 py-3 transition-all rounded-lg group data-[open=true]:bg-emerald-500 data-[open=true]:text-white",
      title:
        "text-base font-semibold groy group-hover:text-white data-[open=true]:text-white transition-all",
      indicator:
        "font-semibold group-hover:text-white data-[open=true]:text-white",
    }}
    startContent={<IconUsers size={20} />}
  >
    <div className="flex flex-col w-full gap-1 px-1">
      <Link href="/private/users/" className={secondaryClass}>
        <IconUsersGroup
          size={20}
          className={pathname == "/private/users" ? activeSecondary : ""}
        />
        Ver usuarios
      </Link>
      <Link href="/private/users/config" className={secondaryClass}>
        <IconSettings
          size={20}
          className={pathname == "/private/users/config" ? activeSecondary : ""}
        />
        Configuración
      </Link>
    </div>
  </AccordionItem>
</Accordion>;
