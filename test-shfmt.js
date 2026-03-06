async function test() {
  const mod = await import('@wasm-fmt/shfmt');
  console.log(Object.keys(mod));
  if (mod.default) {
    await mod.default();
    console.log("format keys: ", Object.keys(mod));
    console.log(mod.format("if [ -z \"$var\" ];then echo empty; fi"));
  }
}
test().catch(console.error);
